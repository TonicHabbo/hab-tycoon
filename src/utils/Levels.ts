export const Levels: ILevel[] = [
    { level: 1, xp: 0, unlocks: [] },
    { level: 2, xp: 300, unlocks: [] },
];

export interface ILevel {
    level: number;
    xp: number;
    unlocks: string[];
}
