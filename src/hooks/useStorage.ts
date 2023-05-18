import { useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import { IFloor } from './useFloors';

const defaultStore = {
    tutorial: 0,
    name: 'Happy',
    coins: 1000,
    level: 10,
    floors: [
        {
            id: 1,
            type: 0,
            name: 'Lobby',
            level: 1,
            ticksToBuild: 0,
        },
        {
            id: 2,
            type: 1,
            name: 'Hallway 1',
            level: 1,
            ticksToBuild: 30,
        },
    ],
    lastTick: 0,
};

interface Store {
    tutorial: number;
    name: string;
    coins: number;
    level: number;
    floors: IFloor[];
}
const storageState = () => {
    const [stored, setStored] = useState<Store>(defaultStore);

    const setValue = (key: string, val: any) => {
        setStored((prev) => {
            let newPrev = { ...prev };

            newPrev[key] = val;

            return newPrev;
        });
    };

    const saveData = () => {
        localStorage.setItem('stored-data', JSON.stringify(stored));

        console.log('Game Saved');
    };

    //

    const tutorialStep = useMemo(() => stored?.tutorial, [stored]);

    const getName = useMemo(() => stored?.name, [stored]);

    const getCoins = useMemo(() => stored?.coins, [stored]);

    const getLevel = useMemo(() => stored?.level, [stored]);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('stored-data'));

        if (local) setStored(local);
        else localStorage.setItem('stored-data', JSON.stringify(defaultStore));
    }, []);

    return {
        stored,
        setValue,
        saveData,
        tutorialStep,
        getName,
        getCoins,
        getLevel,
    };
};

export const useStorage = () => useBetween(storageState);
