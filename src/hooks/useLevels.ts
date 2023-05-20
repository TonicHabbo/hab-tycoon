import { useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import { LevelUp } from '../components';
import { Levels } from '../utils';
import { usePopups } from './usePopups';
import { useStorage } from './useStorage';

const state = () => {
    const { getLevel, getXP, setValue } = useStorage();
    const { addPopup, removePopup } = usePopups();
    const [curLevel, setCurLevel] = useState<number>(getLevel);

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
            addPopup(LevelUp({ level: nextLevel }));
            setValue('level', nextLevel?.level);
        }
    }, [getXP]);

    return { gainXP };
};

export const useLevels = () => useBetween(state);
