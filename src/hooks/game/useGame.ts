import { useState } from 'react';
import { useBetween } from 'use-between';
import { IntervalWebWorker, WorkerBuilder } from '../../utils';
import { useStorage } from '../useStorage';

const state = () => {
    const { setValue } = useStorage();
    const [worker, setWorker] = useState<WorkerBuilder>(null);

    const dispatch = () => {
        window.dispatchEvent(new CustomEvent('game-tick'));

        setValue('lastTick', Math.floor(Date.now() / 1000));
    };

    const startTicker = () => {
        const worker = new WorkerBuilder(IntervalWebWorker);

        setWorker(worker);

        worker.postMessage({ action: 'START', content: 1000 });
        worker.addEventListener('message', () => dispatch());
    };

    return { startTicker };
};

export const useGame = () => useBetween(state);
