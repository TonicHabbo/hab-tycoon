import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { useStorage } from '../useStorage';

const state = () => {
    const [ticks, setTicks] = useState<number>(0);
    const { saveData } = useStorage();

    const saveGame = () => {
        setTicks((prev) => {
            let newV = prev;

            if (newV >= 30) {
                newV = 0;
                saveData();
            } else {
                newV += 1;
            }

            return newV;
        });
    };

    useEffect(() => {
        window.addEventListener('game-tick', () => saveGame());
    }, []);

    return { saveGame };
};

export const useSaveGame = () => useBetween(state);
