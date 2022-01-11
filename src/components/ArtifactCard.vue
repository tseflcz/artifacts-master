<template>
    <div class="artifact-card">
        <div class="head">
            <div class="head-stat">
                <div class="piece-name">{{ pieceName }}</div>
                <div class="main-affix-name">{{ mainAffix.name }}</div>
                <div class="main-affix-value">{{ mainAffix.value }}</div>
                <img src="@/assets/stars.png" alt=""/>
            </div>
            <div class="picture">
                <img :src="pieceImgUrl" alt="" class="head-img"/>
            </div> 
        </div>
        <div class="body">
            <div class="body-head">
                <div class="level">{{ level }}</div>
                <span class="can">{{ AffixScore['attack'].toFixed(1)}}攻 | {{ AffixScore['life'].toFixed(1)}}生 | {{ AffixScore['defend'].toFixed(1)}}防<br/>
                {{ AffixScore['critical'].toFixed(1)}}暴 | {{ AffixScore['recharge'].toFixed(1)}}充 | {{ AffixScore['elementalMastery'].toFixed(1)}}精</span>
            </div>
            <div class="minor-affixes">
                <div class="minor-affix" v-for="a in minorAffixes" :key="a">
                    {{ a }}
                </div>
            </div>
            <div class="affix-numbers" v-if="artifact.level < 20">
                <div class="cur-an">当前{{ currentAffixNumber }}</div>
                <div class="exp-an">期望{{ expectedAffixNumber }}</div>
                <div class="tol-an">总分{{ expectedAffixScore }}</div>
            </div>
            <div class="affix-numbers" v-else>
                <div class="exp-full">已满级{{ expectedAffixNumber }}</div>
                <div class="tol-full">总分{{ expectedAffixScore }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Artifact } from "../ys/artifact";
import chs from "../locale/chs.json";

export default {
    props: {
        artifact: {
            type: Artifact,
            required: true,
        },
    },
    computed: {
        pieceName() {
            return chs.artifact.set[this.artifact.set].pieces[
                this.artifact.type
            ];
        },
        pieceImgUrl() {
            return require(`@/assets/artifacts/${this.artifact.set}/${this.artifact.type}.png`);
        },
        mainAffix() {
            return {
                name: chs.artifact.affix[this.artifact.mainAffix.key],
                value: this.artifact.mainAffix.valueString(),
            };
        },
        level() {
            return `+${this.artifact.level}`;
        },
        minorAffixes() {
            let ret = [];
            for (let a of this.artifact.minorAffixes) {
                ret.push(`· ${chs.artifact.affix[a.key]}+${a.valueString()}`);
            }
            return ret;
        },
        currentAffixNumber() {
            return this.artifact.data.currentAffixNumber.toFixed(2);
        },
        expectedAffixNumber() {
            return this.artifact.data.expectedAffixNumber.toFixed(2);
        },
        AffixScore() {
            return this.artifact.data.currentAffixScore;
        },
        expectedAffixScore() {
            return this.artifact.data.expectedAffixScore.toFixed(2);
        },
    },
};
</script>

<style scoped>
.artifact-card {
    box-shadow: 0 0 2px 0 #0007;
    font-weight: bold;
    width: 192px;
    height: 240px;
    background: #eae4d9;
    font-size: 12px;
    font-weight: bold;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    word-break: keep-all;
}
.head {
    height: 100px;
    display: flex;
    justify-content: space-between;
    background: rgb(102, 87, 88);
    background: linear-gradient(
        165deg,
        rgba(102, 87, 88, 1) 0%,
        rgba(214, 169, 90, 1) 100%
    );
}
.head-stat {
    display: flex;
    flex-direction: column;
    color: white;
    padding: 10px 15px;
    width: 100px;
}
.piece-name {
    flex: 1;
}
.main-affix-name {
    color: #fff7;
    font-size: 10px;
}
.main-affix-value {
    font-size: 18px;
}
.picture{
    width:100px; 
    height:100px;
} 
.picture img{
    width:100px; 
    height:100px;
} 
.body {
    display: flex;
    flex-direction: column;
}
.body-head {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
}
.level {
    background: #333;
    border-radius: 3px;
    color: white;
    padding: 0 4px;
}
.can {
    color: #66c238;
}
.minor-affixes {
    color: #333;
    padding: 0 15px;
}
.affix-numbers {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 20px;
    color: white;
    text-align: center;
    line-height: 20px;
    display: flex;
}
.cur-an {
    background: #a6a6a6;
    width: 33.3%;
}
.exp-an {
    background: #2a82e4;
    width: 33.3%;
}
.tol-an {
    background: #66c238;
    width: 33.3%;
}
.exp-full {
    background: #2a82e4;
    width: 50%;
}
.tol-full {
    background: #66c238;
    width: 50%;
}
</style>