import { Artifact, ArtifactScoreWeight } from '../ys/artifact'
import { FilterBatchOne } from '../ys/artifactFilter'
import { IBuild } from '../ys/build'

export interface IOption {
    key: string
    label: string
    tip?: string
    icon?: string
}

export interface IState {
    artifacts: Artifact[]
    filteredArtifacts: Artifact[]
    filter: {
        set: string[]
        slot: string[]
        main: string[]
        lock: string[]
        lvRange: number[]
        score: number[]
        pro: boolean
        location: string[]
        minorMustHave: string[]
        minorMustNotHave: string[]
    }
    filterBatch: FilterBatchOne[]
    useFilterBatch: number
    weight: ArtifactScoreWeight
    useWeightJson: boolean
    usePreset: boolean
    sort: {
        by: string
        characters: string[]
        build: IBuild
    }
    canExport: boolean
    nReload: number
    loading: boolean
    nResetFilter: number
}
