import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { useGame, useSaveGame } from './game';
import { useFloors } from './useFloors';

const state = () => {
    const [ready, setReady] = useState<boolean>(false);
    const [standalone, setAlone] = useState(false);
    const {} = useGame();
    const {} = useSaveGame();
    const {} = useFloors();

    useEffect(() => {
        let displayMode = 'browser';
        const mqStandAlone = '(display-mode: standalone)';
        //@ts-ignore
        if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
            displayMode = 'standalone';
        }

        if (displayMode == 'standalone') setAlone(true);
    }, []);

    return { ready, setReady, standalone, setAlone };
};

export const useApp = () => useBetween(state);
