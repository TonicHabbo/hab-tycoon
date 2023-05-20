import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { useGame, useGuestsTicker, useSaveGame } from './game';
import { useFloors } from './useFloors';
import { useLevels } from './useLevels';
import { usePopups } from './usePopups';

const state = () => {
    const [ready, setReady] = useState<boolean>(false);
    const [standalone, setAlone] = useState(false);
    const {} = useLevels();
    const {} = useGame();
    const {} = useSaveGame();
    const {} = useFloors();
    const {} = useGuestsTicker();
    const {} = usePopups();

    const isIos = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
    ].includes(navigator.platform);

    useEffect(() => {
        let displayMode = 'browser';
        const mqStandAlone = '(display-mode: standalone)';
        //@ts-ignore
        if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
            displayMode = 'standalone';
        }

        if (displayMode == 'standalone') setAlone(true);
    }, []);

    return { ready, setReady, standalone, setAlone, isIos };
};

export const useApp = () => useBetween(state);
