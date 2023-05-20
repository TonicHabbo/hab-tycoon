export const Levels: ILevel[] = [
    { level: 1, xp: 0, unlocks: [], kinds: [{ id: 0, many: 2 }] },
    {
        level: 2,
        xp: 100,
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
        xp: 200,
        unlocks: ['You can now build 3 Halls'],
        kinds: [
            { id: 0, many: 3 },
            { id: 1, many: 1 },
        ],
    },
    {
        level: 4,
        xp: 400,
        unlocks: ['You can now build 4 Halls, 2 Entertainment Floors'],
        kinds: [
            { id: 0, many: 4 },
            { id: 1, many: 2 },
        ],
    },
    {
        level: 5,
        xp: 600,
        unlocks: ['You can now build 6 Halls, 4 Entertainment Floors'],
        kinds: [
            { id: 0, many: 6 },
            { id: 1, many: 4 },
        ],
    },
];

export interface ILevel {
    level: number;
    xp: number;
    unlocks: string[];
    kinds: { id: number; many: number }[];
}
