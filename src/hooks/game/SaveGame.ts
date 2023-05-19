import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { useStorage } from '../useStorage';

const state = () => {
    const [gameTicks, setGameTicks] = useState<number>(0);
    const [ticks, setTicks] = useState<number>(0);
    const { saveData } = useStorage();

    useEffect(() => {
        saveData();
    }, [gameTicks]);

    useEffect(() => {
        window.addEventListener('game-tick', () => setGameTicks(Math.random()));
    }, []);

    return {};
};

export const useSaveGame = () => useBetween(state);
