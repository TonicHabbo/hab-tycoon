import { useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import { IGuest } from './game';
import { IFloor } from './useFloors';

const defaultStore = {
    tutorial: 0,
    name: 'Happy',
    coins: 1000,
    level: 1,
    xp: 0,
    rating: 0,
    columns: 3,
    floors: [
        {
            id: 1,
            type: 0,
            kind: -1,
            name: 'Lobby',
            level: 1,
            column: 0,
            ticksToTimeout: -1,
        },
    ],
    guests: [],
    lastTick: 0,
};

interface Store {
    tutorial: number;
    name: string;
    coins: number;
    level: number;
    columns: number;
    xp: number;
    rating: number;
    floors: IFloor[];
    guests: IGuest[];
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

    const reset = () => {
        setStored(defaultStore);
    };

    //

    const tutorialStep = useMemo(() => stored?.tutorial, [stored]);

    const getName = useMemo(() => stored?.name, [stored]);

    const getCoins = useMemo(() => stored?.coins, [stored]);

    const getLevel = useMemo(() => stored?.level, [stored]);

    const getXP = useMemo(() => stored?.xp, [stored]);

    const getRating = useMemo(() => stored.rating, [stored]);

    useEffect(() => {
        let local = JSON.parse(localStorage.getItem('stored-data'));

        if (local) {
            local = { ...defaultStore, ...local };
            setStored(local);
        } else
            localStorage.setItem('stored-data', JSON.stringify(defaultStore));
    }, []);

    return {
        stored,
        setValue,
        saveData,
        reset,
        tutorialStep,
        getName,
        getCoins,
        getLevel,
        getXP,
        getRating,
    };
};

export const useStorage = () => useBetween(storageState);
