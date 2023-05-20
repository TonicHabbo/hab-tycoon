/*
kinds
0 - halls/rooms,
1 - entertainment
2 - resturants
3 - illegals
*/
export const FloorType: FloorType[] = [
    {
        id: 0,
        publicName: 'Lobby',
        className: 'lobby-floor',
        cost: 10000,
        levelRequirement: -1,
    },
    // halls
    {
        id: 1,
        kind: 0,
        publicName: 'Small Hallway',
        className: 'hallway-sm',
        cost: 700,
        levelRequirement: 1,
        ticksToBuild: 40,
        ticksToDecomission: 12,
        xpReward: 10,
        guests: 6,
    },
    {
        id: 2,
        kind: 0,
        publicName: 'Medium Hallway',
        className: 'hallway-md',
        cost: 1200,
        levelRequirement: 3,
        ticksToBuild: 60,
        ticksToDecomission: 24,
        xpReward: 15,
        guests: 12,
    },
    {
        id: 4,
        kind: 0,
        publicName: 'Large Hallway',
        className: 'hallway-sm',
        cost: 5000,
        levelRequirement: 5,
        ticksToBuild: 120,
        ticksToDecomission: 36,
        xpReward: 20,
        guests: 18,
    },
    //entertainment
    {
        id: 3,
        kind: 1,
        publicName: 'Club Mammoth',
        className: 'mammoth',
        cost: 1200,
        levelRequirement: 2,
        ticksToBuild: 70,
        ticksToDecomission: 36,
        xpReward: 20,
    },
];

export const kinds: string[] = [
    'Hallways',
    'Entertainment',
    'Resturants',
    'Illegals',
];

interface FloorType {
    id: number;
    kind?: number;
    publicName: string;
    className: string;
    cost: number;
    levelRequirement: number;
    ticksToBuild?: number;
    xpReward?: number;
    guests?: number;
    ticksToDecomission?: number;
}
