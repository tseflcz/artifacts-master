import { ref, computed } from "vue"
import {
    currentAffixNumber,
    expectedAffixNumber,
    expectedAffixScore
} from "../ys/potential";
import { MainAffixes,MainAffixStat } from "../ys/stat";
import chs from "../locale/chs.json";

export default function () {
    const affixName = (key) => {
        let name=''
        switch(key){
            case "defprop":
                name = "攻击-防御转化率";
                break;
            case "hpprop":
                name = "攻击-生命转化率";
                break;
            case "main":
                name = "主属性权重";
                break;
            case "atk":
                name = "攻 击 力";
                break;
            case "hp":
                name = "生 命 值";
                break;
            case "def":
                name = "防 御 力";
                break;
            case "cr":
                name = "暴 击 率";
                break;
            default:
                name = chs.artifact.affix[key];
                break;
        }
        if (["hpp", "atkp", "defp"].includes(key)) {
            name += "%";
        }
        return name;
    }
    const artifacts = ref([]);
    const filter = ref({
        set: "",
        type: "",
        mainAffix: "",
        lvRange: [0, 20],
        sets: computed(() => {
            let cnt = 0,
                s = {};
            for (let a of artifacts.value) {
                cnt++;
                if (a.set in s) {
                    s[a.set]++;
                } else {
                    s[a.set] = 1;
                }
            }
            let ret = [
                {
                    key: "",
                    value: "全部",
                    tip: cnt,
                },
            ];
            for (let key in chs.artifact.set) {
                if (key in s) {
                    ret.push({
                        key,
                        value: chs.artifact.set[key].name,
                        tip: s[key],
                    });
                }
            }
            return ret;
        }),
        types: computed(() => {
            let ret = [
                {
                    key: "",
                    value: "全部",
                    tip: "",
                },
            ];
            for (let key in chs.artifact.type) {
                ret.push({
                    key,
                    value: chs.artifact.type[key],
                    tip: "",
                });
            }
            return ret;
        }),
        mainAffixes: computed(() => {
            let l = filter.value.type
                ? MainAffixes[filter.value.type]
                : MainAffixes.all;
            let ret = [
                {
                    key: "",
                    value: "全部",
                    tip: "",
                },
            ];
            for (let key of l) {
                ret.push({
                    key,
                    value: affixName(key),
                    tip: "",
                });
            }
            return ret;
        })
    });
    const set = [], type = [], mainAffix = [],
        sets = [], types = [], mainAffixes = [];
    for (let key in chs.artifact.set) {
        set.push(key)
        sets.push({
            key,
            value: chs.artifact.set[key].name
        })
    }
    for (let key in chs.artifact.type) {
        type.push(key)
        types.push({
            key,
            value: chs.artifact.type[key]
        })
    }
    for (let key of MainAffixes.all) {
        mainAffix.push(key)
        mainAffixes.push({
            key,
            value: affixName(key)
        })
    }
    const filterPro = ref({
        set,
        type,
        mainAffix,
        lvRange: [0, 20],
        sets,
        types,
        mainAffixes,
        selAllSets: () => {
            filterPro.value.set = filterPro.value.sets.map(x => x.key)
        },
        desAllSets: () => {
            filterPro.value.set = []
        },
        selAllTypes: () => {
            filterPro.value.type = filterPro.value.types.map(x => x.key)
        },
        desAllTypes: () => {
            filterPro.value.type = []
        },
        selAllMainAffixes: () => {
            filterPro.value.mainAffix = filterPro.value.mainAffixes.map(x => x.key)
        },
        desAllMainAffixes: () => {
            filterPro.value.mainAffix = []
        },
    })
    const useFilterPro = ref(false)
    const affixWeight = ref({
        atk: 0.5,
        hp: 0.3,
        def: 0.3,
        atkp: 1,
        hpp: 1,
        defp: 1,
        cr: 1.2,
        cd: 1.2,
        em: 1,
        er: 1,
        main: 0.5,
        hpprop: 0.5,
        defprop : 0.5,
    });
    const orderBy = ref("expectedAffixScore");
    const artifactsList = ref([]);
    const updateArtifactsList = async () => {
        let ret = artifacts.value;
        if (!useFilterPro.value) {
            if (filter.value.set) {
                ret = ret.filter((a) => a.set == filter.value.set);
            }
            if (filter.value.type) {
                ret = ret.filter((a) => a.type == filter.value.type);
            }
            if (filter.value.mainAffix) {
                ret = ret.filter(
                    (a) => a.mainAffix.key == filter.value.mainAffix
                );
            }
            ret = ret.filter((a) => (
                filter.value.lvRange[0] <= a.level &&
                a.level <= filter.value.lvRange[1]
            ));
        } else {
            ret = ret.filter((a) => filterPro.value.set.includes(a.set));
            ret = ret.filter((a) => filterPro.value.type.includes(a.type));
            ret = ret.filter((a) => filterPro.value.mainAffix.includes(a.mainAffix.key));
            ret = ret.filter((a) => (
                filterPro.value.lvRange[0] <= a.level &&
                a.level <= filterPro.value.lvRange[1]
            ));
        }
        for (let a of artifacts.value) {
            let oldId = a.data.id
            a.data = {
                id: Math.random().toString(),
                currentAffixNumber: currentAffixNumber(a, affixWeight.value).S,
                currentAffixScore : currentAffixNumber(a, affixWeight.value).score,
                expectedAffixNumber: expectedAffixNumber(a, affixWeight.value).S,
                expectedAffixScore: expectedAffixScore(a, affixWeight.value)
            };
            if (oldId) {
                a.data.id = oldId
            }
        }
        if (orderBy.value) {
            ret.sort((a, b) => b.data[orderBy.value] - a.data[orderBy.value]);
        }
        artifactsList.value = ret;
    };
    return {
        artifacts,
        affixWeight,
        filter,
        filterPro,
        useFilterPro,
        orderBy,
        artifactsList,
        updateArtifactsList,
        affixName,
        MainAffixStat
    };
}