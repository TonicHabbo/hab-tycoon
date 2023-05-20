export const FloorType: FloorType[] = [
    {
        id: 0,
        publicName: 'Lobby',
        className: 'lobby-floor',
        cost: 0,
        levelRequirement: -1,
    },
    {
        id: 1,
        publicName: 'Small Hallway',
        className: 'hallway-small',
        cost: 1000,
        levelRequirement: 1,
        ticksToBuild: 60,
        xpReward: 10,
        guests: 4,
    },
    {
        id: 2,
        publicName: 'Medium Hallway',
        className: 'hallway-small',
        cost: 5000,
        levelRequirement: 2,
        ticksToBuild: 60,
        xpReward: 15,
        guests: 6,
    },
    {
        id: 3,
        publicName: 'Large Hallway',
        className: 'hallway-small',
        cost: 10000,
        levelRequirement: 4,
        ticksToBuild: 120,
        xpReward: 20,
        guests: 12,
    },
];

interface FloorType {
    id: number;
    publicName: string;
    className: string;
    cost: number;
    levelRequirement: number;
    ticksToBuild?: number;
    xpReward?: number;
    guests?: number;
}
