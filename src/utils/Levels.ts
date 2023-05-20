export const Levels: ILevel[] = [
    { level: 1, xp: 0, unlocks: [], kinds: [{ id: 0, many: 2 }] },
    {
        level: 2,
        xp: 50,
        unlocks: [
            'Club Mammoth',
            'You can now build 2 Halls, 1 Entertainment Floors',
        ],
        kinds: [
            { id: 0, many: 2 },
            { id: 1, many: 1 },
        ],
    },
    {
        level: 3,
        xp: 100,
        unlocks: ['You can now build 3 Halls'],
        kinds: [
            { id: 0, many: 3 },
            { id: 1, many: 1 },
        ],
    },
];

export interface ILevel {
    level: number;
    xp: number;
    unlocks: string[];
    kinds: { id: number; many: number }[];
}
