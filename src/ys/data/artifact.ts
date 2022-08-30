interface IAritfactData {
    minorStat: {
        [key: string]: {
            p: number
            v: number
        }
    },
    minorKeys: string[]
    mainKeys: {
        all: string[]
        flower: string[]
        plume: string[]
        sands: string[]
        goblet: string[]
        circlet: string[]
        [key: string]: string[] // 允许以string为键访问
    }
    mainStat: {
        [key: string]: number[]
    }
    mainDistr: {
        [slotKey: string]: { [key: string]: number }
    }
    mainWeight: {
        [key: string]: {
            [key: string]:{
                p: number
                v: number
            }
        }
    }
}

export default <IAritfactData>{
    minorStat: {
        'hp': { p: 6, v: 298.75 },
        'atk': { p: 6, v: 19.45 },
        'def': { p: 6, v: 23.15 },
        'hpp': { p: 4, v: 5.83 },
        'atkp': { p: 4, v: 5.83 },
        'defp': { p: 4, v: 7.29 },
        'em': { p: 4, v: 23.31 },
        'er': { p: 4, v: 6.48 },
        'cr': { p: 3, v: 3.89 },
        'cd': { p: 3, v: 7.77 },
    },
    minorKeys: ['hp', 'atk', 'def', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd'],
    mainKeys: {
        all: ['hp', 'atk', 'hpp', 'atkp', 'defp', 'em', 'er', 'hb', 'cr', 'cd', 'pyroDB', 'hydroDB', 'electroDB', 'anemoDB', 'cryoDB', 'geoDB', 'physicalDB', 'dendroDB'],
        flower: ['hp'],
        plume: ['atk'],
        sands: ['hpp', 'atkp', 'defp', 'em', 'er'],
        goblet: ['hpp', 'atkp', 'defp', 'em', 'pyroDB', 'hydroDB', 'electroDB', 'anemoDB', 'cryoDB', 'geoDB', 'physicalDB', 'dendroDB'],
        circlet: ['hpp', 'atkp', 'defp', 'em', 'hb', 'cr', 'cd']
    },
    mainStat: {
        'hp': [717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780],
        'atk': [47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311],
        'hpp': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
        'atkp': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
        'defp': [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31.0, 33.5, 36.0, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
        'em': [28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123, 131, 139, 147, 155, 163, 171, 179, 187],
        'er': [7.8, 10.0, 12.2, 14.4, 16.6, 18.8, 21.0, 23.2, 25.4, 27.6, 29.8, 32.0, 34.2, 36.4, 38.6, 40.8, 43.0, 45.2, 47.4, 49.6, 51.8],
        'hb': [5.4, 6.9, 8.4, 10.0, 11.5, 13.0, 14.5, 16.1, 17.6, 19.1, 20.6, 22.1, 23.7, 25.2, 26.7, 28.2, 29.8, 31.3, 32.8, 34.3, 35.9],
        'cr': [4.7, 6.0, 7.3, 8.6, 9.9, 11.3, 12.6, 13.9, 15.2, 16.6, 17.9, 19.2, 20.5, 21.8, 23.2, 24.5, 25.8, 27.1, 28.4, 29.8, 31.1],
        'cd': [9.3, 12.0, 14.6, 17.3, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.7, 38.4, 41.0, 43.7, 46.3, 49.0, 51.6, 54.2, 56.9, 59.5, 62.2],
        'pyroDB': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
        'hydroDB': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
        'electroDB': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
        'anemoDB': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
        'cryoDB': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
        'geoDB': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
        'physicalDB': [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31.0, 33.5, 36.0, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
        'dendroDB': [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    },
    mainDistr: {
        'flower': { 'hp': 1 },
        'plume': { 'atk': 1 },
        'sands': {
            'hpp': 8 / 30,
            'atkp': 8 / 30,
            'defp': 8 / 30,
            'em': 3 / 30,
            'er': 3 / 30
        },
        'goblet': {
            'hpp': 767 / 4000,
            'atkp': 767 / 4000,
            'defp': 766 / 4000,
            'pyroDB': 200 / 4000,
            'hydroDB': 200 / 4000,
            'electroDB': 200 / 4000,
            'anemoDB': 200 / 4000,
            'cryoDB': 200 / 4000,
            'geoDB': 200 / 4000,
            'physicalDB': 200 / 4000,
            'dendroDB': 200 / 4000,
            'em': 100 / 4000,
        },
        'circlet': {
            'hpp': 11 / 50,
            'atkp': 11 / 50,
            'defp': 11 / 50,
            'cr': 5 / 50,
            'cd': 5 / 50,
            'hb': 5 / 50,
            'em': 2 / 50
        }
    },
    mainWeight: {
        'flower':{'hp': { p: 1, v: 1 }},
        'plume':{'atk': { p: 1, v: 1 }},
        'sands':{'atkp': { p: 0.6964, v: 0.2666 },
                'hpp': { p: 0.1607, v: 0.2666 },
                'defp': { p: 0.0893, v: 0.2666 },
                'er': { p: 0.5179, v: 0.1 },
                'em': { p: 0.3750, v: 0.1 }},
        'goblet':{'atkp': { p: 0.25, v: 0.19175 },
                'hpp': { p: 0.1250, v: 0.19175 },
                'defp': { p: 0.0714, v: 0.1915 },
                'pyroDB': { p: 0.098, v: 0.05 },
                'hydroDB': { p: 0.098, v: 0.05 },
                'electroDB': { p: 0.098, v: 0.05 },
                'anemoDB': { p: 0.098, v: 0.05 },
                'cryoDB': { p: 0.098, v: 0.05 },
                'geoDB': { p: 0.098, v: 0.05 },
                'physicalDB': { p: 0.098, v: 0.05 },
                'dendroDB':{ p: 0.098, v: 0.05 },
                'em': { p: 0.1786, v: 0.025 }},
        'circlet':{'atkp': { p: 0.1250, v: 0.22 },
                'hpp': { p: 0.1071, v: 0.22 },
                'defp': { p: 0.0714, v: 0.22 },
                'cr': { p: 0.8036, v: 0.1 },
                'cd': { p: 0.7857, v: 0.1 },
                'hb': { p: 0.1786, v: 0.1 },
                'em': { p: 0.1607, v: 0.04 }},
    },
}