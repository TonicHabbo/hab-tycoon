export const GuestType: IGuestType[] = [
    { name: 'Guest', payout: 10, checkout: 30, rarity: 0, vip: false },
    { name: 'Regular', payout: 13, checkout: 40, rarity: 0, vip: false },
    { name: 'Long-Term', payout: 18, checkout: 80, rarity: 1, vip: false },
    { name: 'VIP', payout: 20, checkout: 40, rarity: 10, vip: true },
];

export interface IGuestType {
    name: string;
    payout: number;
    checkout: number;
    rarity: number;
    vip: boolean;
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

export const generateGuestName = (vip: boolean = false) => {
    let vips = [
        'TheGeneral',
        'Quackster',
        'Meth0d',
        'Leenster',
        'HarmonicRain',
        'Harmony',
        'Skeletor',
        'Billsonnnn',
        'Laynester',
        'RastaLulz',
        'Sledmore',
        'Shorty',
        'Sojobo',
        'ArpyAge',
        'robbis',
        'Liam',
        'Burak',
        'Ju$tin',
        'Batman',
        'ElMayor',
        'Object',
        'Kasja',
        'Damien',
        'Westyy',
        'Bran',
        'treebeard',
        'Webbanditten',
        'Jonteh',
        'Kev',
        'Wwana',
        'Muscab',
        'Frank',
        'Loderse',
        'NotMiceElf',
        'CrashCarson',
        'SmoothCriminal',
        'Puffin',
        'Robbis',
        'Corelo',
        'Yordi',
        'Alejandro',
        'Watson',
        'Witness',
        'Prism',
        'Darkstar',
        'Shady',
        'Dominic',
    ];

    if (vip) {
        return vips[Math.floor(Math.random() * vips.length)];
    }

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
        'Not%Username%',
    ];

    let names = [
        'charlie',
        'lauren',
        'vivian',
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
        'josh',
        'joshua',
        'venus',
        'charlotte',
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
