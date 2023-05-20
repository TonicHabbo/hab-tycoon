import { useEffect, useMemo } from 'react';
import { useBetween } from 'use-between';
import { LevelUp } from '../components';
import { Levels } from '../utils';
import { usePopups } from './usePopups';
import { useStorage } from './useStorage';

const state = () => {
    const { getLevel, getXP, setValue } = useStorage();
    const { addPopup, removePopup } = usePopups();

    const currentLevel = useMemo(() => {
        return Levels.filter((val) => val.level == getLevel)[0];
    }, [getLevel]);

    const nextLevel = useMemo(() => {
        return Levels.filter((val) => val.level == getLevel + 1)[0];
    }, [getLevel]);

    const gainXP = (amount: number) => {
        setValue('xp', amount);
    };

    const maxOfKind = (kind: number) => {
        let levelKind =
            currentLevel?.kinds?.filter((val) => val.id == kind)[0]?.many || 1;

        return levelKind;
    };

    useEffect(() => {
        if (getXP >= nextLevel?.xp) {
            addPopup('level', LevelUp({ level: nextLevel }));
            setValue('level', nextLevel?.level);
        }
    }, [getXP]);

    return { gainXP, maxOfKind };
};

export const useLevels = () => useBetween(state);
