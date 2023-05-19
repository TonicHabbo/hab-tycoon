import { useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import { ILevel, Levels } from '../utils';
import { useStorage } from './useStorage';

const state = () => {
    const { getLevel, getXP, setValue } = useStorage();
    const [curLevel, setCurLevel] = useState<number>(getLevel);
    const [leveled, setLeveled] = useState<ILevel>(null);

    const currentLevel = useMemo(() => {
        return Levels.filter((val) => val.level == getLevel)[0];
    }, [getLevel]);

    const nextLevel = useMemo(() => {
        return Levels.filter((val) => val.level == getLevel + 1)[0];
    }, [getLevel]);

    const gainXP = (amount: number) => {
        setValue('xp', amount);
    };

    useEffect(() => {
        if (getXP >= nextLevel?.xp) {
            setLeveled(nextLevel);
            setValue('level', nextLevel?.level);
        }
    }, [getXP]);

    return { gainXP, leveled, setLeveled };
};

export const useLevels = () => useBetween(state);
