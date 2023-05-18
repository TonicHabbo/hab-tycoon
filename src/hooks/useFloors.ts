import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import { FloorType } from '../utils';
import { useStorage } from './useStorage';

export interface IFloor {
    id: number;
    type: number;
    name: string;
    level: number;
    ticksToBuild: number;
}

const state = () => {
    const { stored, getLevel, setValue, getCoins } = useStorage();
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
            ticksToBuild: floorType.ticksToBuild,
        };

        setValue('coins', getCoins - floorType?.cost);

        setValue('floors', [...floors, newFloor]);
    };
    const [ticks, setTicks] = useState<number>(0);

    const updateFloors = useCallback(() => {
        setTicks(Math.random());
    }, [floors]);

    useEffect(() => {
        let updatedFloors = [...floors];

        let updated = 0;

        for (let floor of updatedFloors) {
            if (floor.ticksToBuild > 0) {
                floor.ticksToBuild -= 1;
                updated += 1;
            }
        }

        if (updated) console.log('updated floors:', updated);

        setValue('floors', [...updatedFloors]);
    }, [ticks]);

    useEffect(() => {
        window.addEventListener('game-tick', updateFloors.bind(this));
    }, []);

    return {
        floors,
        getFloorType,
        getFloorClass,
        floorCreator,
        setFloorCreator,
        getBuildableFloors,
        createFloor,
        updateFloors,
    };
};

export const useFloors = () => useBetween(state);
