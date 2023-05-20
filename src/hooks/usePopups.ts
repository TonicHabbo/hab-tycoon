import { ReactNode, useEffect, useState } from 'react';
import { useBetween } from 'use-between';

const state = () => {
    const [popups, setPopups] = useState<{ key: string; node: ReactNode }[]>(
        []
    );
    const isIos = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
    ].includes(navigator.platform);
    const [allowNotifications, setAllowNotifications] =
        useState<boolean>(false);

    const addPopup = (key: string, popup: ReactNode) => {
        setPopups((prev) => [...prev, { key, node: popup }]);
    };

    const removePopup = (key: string) => {
        setPopups((prev) => prev.filter((val) => val.key !== key));
    };

    const notify = (message: string, force: boolean = true) => {
        let focused = !force && document.visibilityState === 'visible';
        if (allowNotifications && !focused) {
            let notif = new Notification('HELLOOOOO', {
                body: message,
            });

            notif.onclick = () => notif.close();
        }
        if (isIos) alert(message);
    };

    useEffect(() => {
        if (!isIos) {
            Notification.requestPermission().then(function (result) {
                if (result == 'granted') {
                    setAllowNotifications(true);
                }
            });
        }
    }, []);

    return { popups, addPopup, removePopup, notify };
};

export const usePopups = () => useBetween(state);
