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
    const [gameTicks, setGameTicks] = useState<number>(0);
    const [ticks, setTicks] = useState<number>(0);
    const { stored, getRating, setValue, getCoins } = useStorage();
    const { maxGuests } = useFloors();

    const getGuests = useMemo(() => stored.guests, [stored]);

    const checkInOut = () => {
        tickGuests();
        console.log(maxGuests, getGuests?.length);
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
            } else {
                guest.checkout -= 1;
                coins += type.payout;
            }
        }

        console.log(deletion);

        updated = updated.filter((val, i) => {
            return !deletion.includes(i);
        });

        if (coins) setValue('coins', getCoins + coins);
        setValue('guests', updated);
    };

    const addGuest = () => {
        let randomType = randomGuestType();
        let username = generateGuestName();

        let newGuest: IGuest = {
            name: username,
            type: GuestType.findIndex((el) => el === randomType),
            checkout: randomType.checkout,
        };

        console.log(newGuest, randomType);
        setValue('guests', [...getGuests, newGuest]);
    };

    useEffect(() => {
        checkInOut();
    }, [gameTicks]);

    useEffect(() => {
        window.addEventListener('game-tick', () => setGameTicks(Math.random()));
    }, []);

    return {};
};

export const useGuestsTicker = () => useBetween(state);
