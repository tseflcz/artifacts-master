const MinorAffixStat = {
    'hp': { p: 6, v: 298.75 },
    'atk': { p: 6, v: 19.45 },
    'def': { p: 6, v: 23.15 },
    'hpp': { p: 4, v: 0.0583 },
    'atkp': { p: 4, v: 0.0583 },
    'defp': { p: 4, v: 0.0729 },
    'em': { p: 4, v: 23.31 },
    'er': { p: 4, v: 0.0648 },
    'cr': { p: 3, v: 0.0389 },
    'cd': { p: 3, v: 0.0777 },
}

const MainAffixStat = {
    'flower':{'hp': { p: 1, v: 1 }},
    'plume':{'atk': { p: 1, v: 1 }},
    'sands':{'atkp': { p: 0.7292, v: 0.2666 },
            'hpp': { p: 0.1458, v: 0.2666 },
            'defp': { p: 0.1042, v: 0.2666 },
            'er': { p: 0.5833, v: 0.1 },
            'em': { p: 0.2292, v: 0.1 }},
    'goblet':{'atkp': { p: 0.2917, v: 0.2125 },
            'hpp': { p: 0.1250, v: 0.2125 },
            'defp': { p: 0.0833, v: 0.2 },
            'pyro': { p: 0.1250, v: 0.05 },
            'hydro': { p: 0.1250, v: 0.05 },
            'electro': { p: 0.1250, v: 0.05 },
            'anemo': { p: 0.1250, v: 0.05 },
            'cryo': { p: 0.1250, v: 0.05 },
            'geo': { p: 0.1250, v: 0.05 },
            'physical': { p: 0.1250, v: 0.05 },
            'em': { p: 0.1458, v: 0.025 }},
    'circlet':{'atkp': { p: 0.1666, v: 0.22 },
            'hpp': { p: 0.1042, v: 0.22 },
            'defp': { p: 0.0833, v: 0.22 },
            'cr': { p: 0.7917, v: 0.1 },
            'cd': { p: 0.7708, v: 0.1 },
            'hb': { p: 0.1666, v: 0.1 },
            'em': { p: 0.1458, v: 0.04 }},
}

const MinorAffixes = [
    'hp', 'atk', 'def', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd'
]

const MainAffixes = {
    all: ['hp', 'atk', 'hpp', 'atkp', 'defp', 'em', 'er', 'hb', 'cr', 'cd', 'pyro', 'hydro', 'electro', 'anemo', 'cryo', 'geo', 'physical'],
    flower: ['hp'],
    plume: ['atk'],
    sands: ['hpp', 'atkp', 'defp', 'em', 'er'],
    goblet: ['hpp', 'atkp', 'defp', 'em', 'pyro', 'hydro', 'electro', 'anemo', 'cryo', 'geo', 'physical'],
    circlet: ['hpp', 'atkp', 'defp', 'em', 'hb', 'cr', 'cd']
}

export { MinorAffixStat, MainAffixStat, MinorAffixes, MainAffixes }