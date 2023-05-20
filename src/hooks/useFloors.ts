import { useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import { FloorType } from '../utils';
import { useLevels } from './useLevels';
import { usePopups } from './usePopups';
import { useStorage } from './useStorage';

export interface IFloor {
    id: number;
    type: number;
    name: string;
    level: number;
    ticksToBuild: number;
    kind: number;
}

const state = () => {
    const { stored, getLevel, setValue, getCoins } = useStorage();
    const { gainXP } = useLevels();
    const { notify } = usePopups();

    const [floorCreator, setFloorCreator] = useState<boolean>(false);

    const floors = useMemo(() => stored.floors, [stored]);

    const getFloorType = (type: number) => {
        return FloorType.filter((val) => val.id == type)[0];
    };

    const getFloorClass = (type: number) => {
        return getFloorType(type)?.className;
    };

    const getBuildableFloors = () => {
        return FloorType.filter(
            (val) =>
                val.levelRequirement <= getLevel && val.levelRequirement > -1
        );
    };

    const createFloor = (type: number, name: string) => {
        let floorType = getFloorType(type);

        let newFloor: IFloor = {
            id: floors.length + 1,
            type,
            name,
            level: 1,
            ticksToBuild: floorType?.ticksToBuild,
            kind: floorType?.kind,
        };

        setValue('coins', getCoins - floorType?.cost);

        setValue('floors', [...floors, newFloor]);
        gainXP(floorType.xpReward);
    };
    const [ticks, setTicks] = useState<number>(0);

    const maxGuests = useMemo(() => {
        let max = 0;

        for (let floor of floors)
            if (getFloorType(floor.type)?.guests > 0 && floor.ticksToBuild <= 0)
                max += getFloorType(floor.type)?.guests;

        return max;
    }, [floors]);

    const kindBuilt = (kind: number) => {
        let amount = 0;

        for (let floor of floors) if (floor.kind == kind) amount += 1;

        return amount;
    };

    useEffect(() => {
        let updatedFloors = [...floors];

        let updated = 0;

        for (let floor of updatedFloors) {
            if (floor.ticksToBuild > 0) {
                floor.ticksToBuild -= 1;

                if (floor.ticksToBuild == 0)
                    notify(floor.name + ' Has finished building!');

                updated += 1;
            } else {
            }
        }

        if (updated) console.log('updated floors:', updated);

        setValue('floors', [...updatedFloors]);
    }, [ticks]);

    useEffect(() => {
        window.addEventListener('game-tick', () =>
            setTicks(Math.random() * 30000)
        );
    }, []);

    return {
        floors,
        getFloorType,
        getFloorClass,
        floorCreator,
        setFloorCreator,
        getBuildableFloors,
        createFloor,
        maxGuests,
        kindBuilt,
    };
};

export const useFloors = () => useBetween(state);
