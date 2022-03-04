import { Artifact } from '../ys/artifact'

export interface IOption {
    key: string
    value: string
    tip: string
}

export interface IState {
    artifacts: Artifact[]
    filteredArtifacts: Artifact[]
    filter: {
        set: string
        slot: string
        main: string
        location: string
        lock: string
        lvRange: number[]
    }
    filterPro: {
        set: string[]
        slot: string[]
        main: string[]
        location: string[]
        lock: string[]
        lvRange: number[]
        score: number[]
    }
    useFilterPro: boolean
    weight: {
        [key: string]: number
    },
    useWeightJson: boolean
    sortBy: string
    sortord: boolean
    canExport: boolean
    nReload: number
    loading: boolean
}
