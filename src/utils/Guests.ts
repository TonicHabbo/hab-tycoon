export const GuestType: IGuestType[] = [
    { name: 'Guest', payout: 2, checkout: 120, rarity: 0 },
    { name: 'Regular', payout: 1, checkout: 150, rarity: 0 },
    { name: 'Long-Term', payout: 1, checkout: 300, rarity: 1 },
    { name: 'VIP', payout: 5, checkout: 40, rarity: 10 },
];

export interface IGuestType {
    name: string;
    payout: number;
    checkout: number;
    rarity: number;
}

export const randomGuestType = () => {
    let type: IGuestType = null;

    // Calculate chances for common
    var filler =
        100 -
        GuestType.map((r) => r.rarity).reduce((sum, current) => sum + current);

    if (filler <= 0) {
        return;
    }

    // Create an array of 100 elements, based on the chances field
    var probability = GuestType.map((r, i) =>
        Array(r.rarity === 0 ? filler : r.rarity).fill(i)
    ).reduce((c, v) => c.concat(v), []);

    // Pick one
    var pIndex = Math.floor(Math.random() * 100);
    type = GuestType[probability[pIndex]];

    return type;
};

export const generateGuestName = () => {
    let usernames = [
        '.:%Username%:.',
        'xX%Username%Xx',
        '%Username%',
        '%username%',
        'BAMItz%Username%',
        '.-%Username%-.',
        '_-%Username%-_',
        '%c%',
        '%C%',
        '%n%',
    ];

    let names = [
        'charlie',
        'lauren',
        'vivian',
        'image.png',
        'benjamin',
        'coral',
        'jake',
        'jay',
        'billy',
        'kayden',
        'noel',
        'aiden',
        'fae',
        'jacob',
        'craig',
        'john',
        'johnny',
        'lane',
        'jordan',
        'jordy',
        'kayla',
        'taylor',
        'isabelle',
        'iza',
        'sarah',
        'belle',
        'bridgette',
        'ginger',
        'liam',
        'jamie',
        'winter',
        'summer',
        'fall',
        'autumn',
        'dory',
        'ash',
        'ashley',
        'amy',
        'jess',
        'jessica',
        'zion',
        'zephyr',
        'britney',
        'brittany',
        'britt',
        'samantha',
        'sam',
        'lucas',
        'frank',
        'ivy',
        'mars',
        'earth',
        'jupiter',
        'moon',
        'mackenzie',
        'kenzie',
        'mack',
        'lewis',
        'louis',
        'mary',
        'mary',
    ];

    let randomUsername =
        usernames[Math.floor(Math.random() * usernames.length)];
    let randomName = names[Math.floor(Math.random() * names.length)];

    let fullName = randomUsername
        .replace('%username%', randomName)
        .replace(
            '%Username%',
            randomName.charAt(0).toUpperCase() + randomName.slice(1)
        )
        .replace('%c%', randomName.charAt(0))
        .replace('%C%', randomName.charAt(0).toUpperCase())
        .replace('%n%', randomName.length.toString());

    return fullName;
};
