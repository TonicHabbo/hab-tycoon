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
    ticksToBuild?: number;
    ticksToTimeout?: number;
    kind?: number;
    column?: number;
}

const state = () => {
    const { stored, getLevel, setValue, getCoins } = useStorage();
    const { gainXP } = useLevels();
    const { notify } = usePopups();

    const [floorCreator, setFloorCreator] = useState<boolean>(false);
    const [selectedColumn, setSelectedColumn] = useState<number>(0);

    const floors = useMemo(() => stored?.floors, [stored]);
    const columns = useMemo(
        () => stored?.floors.filter((val) => val.kind == -1)[0]?.level,
        [stored]
    );

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
            column: selectedColumn,
            ticksToTimeout: floorType?.ticksToDecomission,
        };

        setValue('coins', getCoins - floorType?.cost);

        setValue('floors', [...floors, newFloor]);
        gainXP(floorType.xpReward);
    };

    const upgradeFloor = (floor: IFloor) => {
        let updates = [...floors];

        for (let i = 0; i < updates.length; i++) {
            if (updates[i].id == floor.id) {
                updates[i].level += 1;
            }
        }

        setValue('floors', [...updates]);
    };

    const recommissionFloor = (floor: IFloor) => {
        let updates = [...floors];
        let type = getFloorType(floor.type);

        for (let i = 0; i < updates.length; i++)
            if (updates[i].id == floor.id)
                updates[i].ticksToTimeout =
                    type.ticksToDecomission * floor.level;

        setValue('floors', [...updates]);
    };

    const removeFloor = (floor: IFloor) => {
        let updates = [...floors];

        updates = updates.filter((val) => val.id !== floor.id);

        setValue('floors', [...updates]);
    };

    const [ticks, setTicks] = useState<number>(0);

    const maxGuests = useMemo(() => {
        let max = 0;

        for (let floor of floors)
            if (getFloorType(floor.type)?.guests > 0 && floor.ticksToBuild <= 0)
                max += getFloorType(floor.type)?.guests + 0.8 * floor.level;

        return max;
    }, [floors]);

    const kindBuilt = (kind: number) => {
        let amount = 0;

        for (let floor of floors) if (floor.kind == kind) amount += 1;

        return amount;
    };

    const randomEmptyFloor = () => {
        let emptyFloors = floors.filter(
            (val) =>
                val.ticksToTimeout > 0 && val.kind == 0 && val.ticksToBuild == 0
        );

        return emptyFloors[Math.floor(Math.random() * emptyFloors.length)];
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
                //
            }
        }

        if (updated) console.log('updated floors:', updated);

        setValue('floors', [...updatedFloors]);
    }, [ticks]);

    const upgradeCost = (floor: IFloor) => {
        const type = getFloorType(floor.type);
        const cost = type.cost * (floor.level + 1);

        return cost;
    };

    const upgrade = (floor: IFloor) => {
        const cost = upgradeCost(floor);
        if (getCoins < cost) {
            notify('You cannot afford this right now!');
        } else {
            setValue('coins', getCoins - cost);
            upgradeFloor(floor);
        }
    };

    const recommissionCost = (floor: IFloor) => {
        const type = getFloorType(floor.type);
        const cost = type.ticksToDecomission * (floor.level + 1);

        return cost;
    };

    const recommission = (floor: IFloor) => {
        const cost = recommissionCost(floor);

        if (getCoins < cost) {
            notify('You cannot afford this right now!');
        } else {
            setValue('coins', getCoins - cost);
            recommissionFloor(floor);
        }
    };
    const demolishCost = (floor: IFloor) => getFloorType(floor.type)?.cost;

    const demolish = (floor: IFloor) => {
        const cost = demolishCost(floor);

        if (getCoins < cost) {
            notify('You cannot afford this right now!');
        } else {
            setValue('coins', getCoins - cost);
            removeFloor(floor);
        }
    };

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
        columns,
        selectedColumn,
        setSelectedColumn,
        upgradeCost,
        upgrade,
        demolishCost,
        demolish,
        recommission,
        recommissionCost,
        randomEmptyFloor,
    };
};

export const useFloors = () => useBetween(state);
