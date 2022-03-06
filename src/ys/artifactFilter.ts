/**
 * 圣遗物过滤器
 *
 */
import { Artifact, Affix } from './Artifact'
export enum SubFilterEquation {
    '<',
    '<=',
    '>',
    '>=',
    '=',
}
export class SubFilter {
    name: string = ''
    value: string = '0'
    equation: SubFilterEquation = SubFilterEquation['>']
    constructor (data?: any) {
        if (!data) return;
        for (const i in data)
            if (this.hasOwnProperty(i)) {
                // @ts-ignore
                this[i] = data[i];
            }
    }
    filterOne(input: Affix): number {
        if (this.name !== input.key) return 0
        // if ((input.value.indexOf('%') === -1) !== (this.value.indexOf('%') === -1)) return 0 // 一个有%一个没有，不同类
        const value = input.value;
        const thisvalue = parseFloat(this.value);
        if (this.equation === SubFilterEquation['<']) return value < thisvalue ? 1 : 0
        if (this.equation === SubFilterEquation['<=']) return value <= thisvalue ? 1 : 0
        if (this.equation === SubFilterEquation['>']) return value > thisvalue ? 1 : 0
        if (this.equation === SubFilterEquation['>=']) return value >= thisvalue ? 1 : 0
        // remain '='
        return value === thisvalue ? 1 : 0
    }
    filter(input: Affix[]): number {
        let res = 0
        for (const i of input) res += this.filterOne(i)
        return res
    }
}
export class ArtifactFilter {
    main: String[] = []
    stars: Number[] = []
    level: Number[] = []
    // name: String[] = []
    set: String[] = []
    position: String[] = []
    lock: Boolean[] = []
    character: String[] = []
    subCount: Number[] = []
    includeSub: SubFilter[] = []
    includeSubCount: number = 0
    excludeSub: SubFilter[] = []
    excludeSubCount: number = 0
    private filterOne<T>(input: T, filter: T[]): boolean {
        if (filter.length === 0) return true
        return filter.indexOf(input) !== -1
    }
    private filterSub(input: Affix[], filters: SubFilter[], targetCount: number, empty: boolean): boolean {
        if (filters.length === 0) return empty
        let matchCount = 0
        for (const filter of filters) matchCount += filter.filter(input)
        return targetCount <= matchCount
    }
    filter(artifact: Artifact): boolean {
        let inFilter = true
        inFilter &&= this.filterOne(artifact.main.key, this.main)
        inFilter &&= this.filterOne(artifact.rarity, this.stars)
        inFilter &&= this.filterOne(artifact.level, this.level)
        // inFilter &&= this.filterOne(artifact.name, this.name)
        // const [set, position] = ArtifactToSetPosition.get(artifact.name) || ['', '']
        const set = artifact.set;
        const position = artifact.slot;
        inFilter &&= this.filterOne(set, this.set)
        inFilter &&= this.filterOne(position, this.position)
        inFilter &&= this.filterOne(artifact.lock, this.lock)
        inFilter &&= this.filterOne(artifact.location, this.character)
        inFilter &&= this.filterOne(artifact.minors.length, this.subCount)
        const subInclude = this.filterSub(artifact.minors, this.includeSub, this.includeSubCount, true)
        const subExclude = this.filterSub(artifact.minors, this.excludeSub, this.excludeSubCount + 1, false)
        inFilter = inFilter && subInclude && !subExclude
        return inFilter
    }
    loadFromJSON(str: string) {
        const data = JSON.parse(str);
        for (const i in data)
            if (this.hasOwnProperty(i))
                if (i === 'includeSub' || i === 'excludeSub') {
                    this[i] = [];
                    for (let j = 0; j < data[i].length; j ++ )
                        this[i].push(new SubFilter(data[i][j]));
                }
                // @ts-ignore
                else this[i] = data[i];
    }
}

export class FilterBatchOne {
    comment: string = ''
    lock: string = 'disabled'
    showFilter: boolean = false
    filter: ArtifactFilter = new ArtifactFilter()
    constructor (data?: any) {
        this.loadFromJSON(data);
    }
    loadFromJSON(data?: any) {
        if (!data) return;
        this.filter.loadFromJSON(JSON.stringify(data.filter));
        this.comment = data.comment;
        this.lock = data.lock;
    }
}
