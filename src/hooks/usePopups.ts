import { ReactNode, useState } from 'react';
import { useBetween } from 'use-between';

const state = () => {
    const [popups, setPopups] = useState<ReactNode[]>([]);

    const addPopup = (popup: ReactNode) => {
        setPopups((prev) => [...prev, popup]);
    };

    const removePopup = (popup: ReactNode) => {
        setPopups((prev) => {
            let newPrev = [...prev];

            newPrev = newPrev.filter((val) => val !== popup);

            return newPrev;
        });
    };

    return { popups, addPopup, removePopup };
};

export const usePopups = () => useBetween(state);
