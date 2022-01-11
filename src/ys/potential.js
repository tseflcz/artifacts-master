import { assert } from './error'
import { Artifact } from './artifact'
import { MinorAffixStat, MinorAffixes, MainAffixStat } from './stat'

/**
 * 
 * @param {Artifact} artifact 
 */
function validateArtifact(artifact) {
    assert(artifact instanceof Artifact)
    assert(artifact.rarity == 5, 'Only 5 star artifacts are supported')
    assert([3, 4].includes(artifact.minorAffixes.length), 'Invalid artifact')
    assert(artifact.level >= 0 && artifact.level <= 20, 'Invalid artifact')
    assert(artifact.level < 4 || artifact.minorAffixes.length == 4, 'Invalid artifact')
}

/**
 * 
 * @param {Object} obj objective dict
 * @param {Set} A possible key set

function argmax(obj, A) {
    let m = undefined, ma = undefined
    A.forEach(a => {
        if (a in obj) {
            if (m === undefined || obj[a] > m) {
                m = obj[a]
                ma = a
            }
        }
    })
    return ma
}


 * 
 * @param {Object} obj objective dict
 * @param {Set} A possible key set

function argmin(obj, A) {
    let m = undefined, ma = undefined
    A.forEach(a => {
        if (a in obj) {
            if (m === undefined || obj[a] < m) {
                m = obj[a]
                ma = a
            }
        }
    })
    return ma
}
 */

/**
 * 
 * @param {Artifact} artifact 
 */
function availableAffixSet(artifact) {
    let ret = new Set(MinorAffixes)
    ret.delete(artifact.mainAffix.key)
    for (let a of artifact.minorAffixes) {
        ret.delete(a.key)
    }
    return ret
}


/**
 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object
 */
function expectedAffixNumber(artifact, w) {
    // validateArtifact(artifact)
    let n = Math.ceil((20 - artifact.level) / 4) // n.o. upgrades
    let S = 0
    if (artifact.minorAffixes.length == 3) {
        let avaAfs = availableAffixSet(artifact)
        let nm = 0, dn = 0
        avaAfs.forEach(akey => {
            nm += w[akey] * MinorAffixStat[akey].p
            dn += MinorAffixStat[akey].p
        })
        S += nm / dn * 1.7
        n--
    }
    var score={'life':0,'attack':0,'defend':0,'critical':0,'elementalMastery':0,'recharge':0}
    let ean = n * 0.85 / 4
    for (let a of artifact.minorAffixes) {
        switch (a.key) {
            case "atkp":
                score['attack'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "atk":
                score['attack'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "hpp":
                score['life'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "hp":
                score['life'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "defp":
                score['defend'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "def":
                score['defend'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "em":
                score['elementalMastery'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "er":
                score['recharge'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "cr":
                score['critical'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
            case "cd":
                score['critical'] += w[a.key] * (a.value / MinorAffixStat[a.key].v + ean)
                break
        }
    }
    let maintag = artifact.mainAffix.key
    switch(maintag){
        case 'atkp':
            S=score['critical']+score['attack']+score['elementalMastery']+score['recharge']
            break
        case 'defp':
            S=score['critical']+score['defend']+score['elementalMastery']+score['recharge']+w['defprop']*score['attack']
            break
        case 'hpp':
            S=score['critical']+score['life']+score['elementalMastery']+score['recharge']+w['hpprop']*score['attack']
            break
        default:
            var temp = Object.keys(score).sort(function(a,b){ return score[b]-score[a]; })
            for(var key in temp){ 
                if(temp[key]=='attack' || temp[key]=='defend' || temp[key]=='life'){
                    maintag=temp[key]
                    break
                }
            }
            if (score[maintag]!=0){
                switch(maintag){
                case 'attack':
                    S=score['critical']+score['attack']+score['elementalMastery']+score['recharge']
                    break 
                case 'defend':
                    S=score['critical']+score['defend']+score['elementalMastery']+score['recharge']+w['defprop']*score['attack']
                    break 
                case 'life':
                    S=score['critical']+score['life']+score['elementalMastery']+score['recharge']+w['hpprop']*score['attack'] 
                    break 
                }
            }      
            else{
                S=score['critical']+score['elementalMastery']+score['recharge']
            }
    }
    return {
        S:S,
        score:score
    }
}

/**
 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object
 
function maximumAffixNumber(artifact, w) {
    // validateArtifact(artifact)
    let n = Math.ceil((20 - artifact.level) / 4) // n.o. upgrades
    let S = 0, A = new Set()
    for (let a of artifact.minorAffixes) {
        S += w[a.key] * a.value / MinorAffixStat[a.key].v
        A.add(a.key)
    }
    if (artifact.minorAffixes.length == 3) {
        let avaAfs = availableAffixSet(artifact)
        let a4 = argmax(w, avaAfs)
        S += w[a4]
        A.add(a4)
        n--
    }
    let amax = argmax(w, A)
    S += n * w[amax]
    return S
}


 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object

function minimumAffixNumber(artifact, w) {
    // validateArtifact(artifact)
    let n = Math.ceil((20 - artifact.level) / 4) // n.o. upgrades
    let S = 0, A = new Set()
    for (let a of artifact.minorAffixes) {
        S += w[a.key] * a.value / MinorAffixStat[a.key].v
        A.add(a.key)
    }
    if (artifact.minorAffixes.length == 3) {
        let avaAfs = availableAffixSet(artifact)
        let a4 = argmin(w, avaAfs)
        S += 0.7 * w[a4]
        A.add(a4)
        n--
    }
    let amin = argmin(w, A)
    S += n * 0.7 * w[amin]
    return S
}
*/

/**
 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object
 */
function currentAffixNumber(artifact, w) {
    // validateArtifact(artifact)
    let S = 0
    var score={'life':0,'attack':0,'defend':0,'critical':0,'elementalMastery':0,'recharge':0}
    for (let a of artifact.minorAffixes) {
        switch (a.key) {
            case "atkp":
                score['attack'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "atk":
                score['attack'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "hpp":
                score['life'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "hp":
                score['life'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "defp":
                score['defend'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "def":
                score['defend'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "em":
                score['elementalMastery'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "er":
                score['recharge'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "cr":
                score['critical'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
            case "cd":
                score['critical'] += w[a.key] * (a.value / MinorAffixStat[a.key].v)
                break
        }
    }
    let maintag = artifact.mainAffix.key
    switch(maintag){
        case 'atkp':
            S=score['critical']+score['attack']+score['elementalMastery']+score['recharge']
            break
        case 'defp':
            S=score['critical']+score['defend']+score['elementalMastery']+score['recharge']+w['defprop']*score['attack']
            break
        case 'hpp':
            S=score['critical']+score['life']+score['elementalMastery']+score['recharge']+w['hpprop']*score['attack']
            break
        default:
            var temp = Object.keys(score).sort(function(a,b){ return score[b]-score[a]; })
            for(var key in temp){ 
                if(temp[key]=='attack' || temp[key]=='defend' || temp[key]=='life'){
                    maintag=temp[key]
                    break
                }
            }
            if (score[maintag]!=0){
                switch(maintag){
                case 'attack':
                    S=score['critical']+score['attack']+score['elementalMastery']+score['recharge']
                    break 
                case 'defend':
                    S=score['critical']+score['defend']+score['elementalMastery']+score['recharge']+w['defprop']*score['attack']
                    break 
                case 'life':
                    S=score['critical']+score['life']+score['elementalMastery']+score['recharge']+w['hpprop']*score['attack'] 
                    break 
                }
            }      
            else{
                S=score['critical']+score['elementalMastery']+score['recharge']
            }
    }
    return {
        S:S,
        score:score
    }
}

/**
 * @param {Artifact} artifact
 * @param {Object} w User minor affix weight object
 */
 function expectedAffixScore(artifact, w) {
    return expectedAffixNumber(artifact, w).S + w['main'] * MainAffixStat[artifact.type][artifact.mainAffix.key].p / MainAffixStat[artifact.type][artifact.mainAffix.key].v
 }

export { validateArtifact }
export { expectedAffixNumber, currentAffixNumber, expectedAffixScore }