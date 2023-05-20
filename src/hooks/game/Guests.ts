import { useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import { GuestType, generateGuestName, randomGuestType } from '../../utils';
import { useFloors } from '../useFloors';
import { useStorage } from '../useStorage';

export interface IGuest {
    name: string;
    type: number;
    checkout: number;
}

const state = () => {
    const [gameTicks, setGameTicks] = useState<number>(-1);
    const [ticks, setTicks] = useState<number>(0);
    const { stored, getRating, setValue, getCoins } = useStorage();
    const { maxGuests } = useFloors();

    const getGuests = useMemo(() => stored.guests, [stored]);

    const checkInOut = () => {
        if (ticks == 0) return;

        tickGuests();
        if (maxGuests > getGuests?.length) addGuest();
    };

    const guestType = (type: number) => {
        return GuestType.filter((val, i) => i == type)[0];
    };

    const tickGuests = () => {
        let updated: IGuest[] = [...getGuests];

        let deletion: number[] = [];
        let coins: number = 0;

        for (let i = 0; i < updated.length; i++) {
            let guest = updated[i];
            let type = guestType(guest.type);

            if (guest.checkout <= 0) {
                deletion.push(i);
                coins += type.payout;
            } else guest.checkout -= 1;
        }

        updated = updated.filter((val, i) => {
            return !deletion.includes(i);
        });

        if (coins) setValue('coins', getCoins + coins);
        setValue('guests', updated);
    };

    const addGuest = () => {
        let randomType = randomGuestType();
        let username = generateGuestName(randomType.vip);

        let newGuest: IGuest = {
            name: username,
            type: GuestType.findIndex((el) => el === randomType),
            checkout: randomType.checkout,
        };
        setValue('guests', [...getGuests, newGuest]);
    };

    useEffect(() => {
        setTicks(ticks + 1);
        checkInOut();
    }, [gameTicks]);

    useEffect(() => {
        let ticks = 0;
        window.addEventListener('game-tick', () => {
            ticks++;
            setGameTicks(ticks);
        });
    }, []);

    return {};
};

export const useGuestsTicker = () => useBetween(state);
