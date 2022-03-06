import { Artifact } from '../ys/artifact'
import { FilterBatchOne } from '../ys/artifactFilter'

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
        score: number[]
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
    filterBatch: FilterBatchOne[]
    useFilterPro: boolean
    useFilterBatch: number
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
