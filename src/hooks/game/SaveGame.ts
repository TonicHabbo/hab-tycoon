import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { useStorage } from '../useStorage';

const state = () => {
    const [gameTicks, setGameTicks] = useState<number>(0);
    const [ticks, setTicks] = useState<number>(0);
    const { saveData } = useStorage();

    const tick = () => {
        setGameTicks(Math.random());
    };

    useEffect(() => {
        setTicks((prev) => {
            let newV = prev + 1;

            console.log(newV);

            if (newV >= 10) {
                saveData();
                newV = 0;
            }
            return newV;
        });
    }, [gameTicks]);

    useEffect(() => {
        window.addEventListener('game-tick', () => tick());
    }, []);

    return {};
};

export const useSaveGame = () => useBetween(state);
