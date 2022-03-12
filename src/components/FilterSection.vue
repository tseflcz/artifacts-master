<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue';
import DropSelect from './DropSelect.vue';
import RangeSlider from './RangeSlider.vue';
import { ArtifactFilter } from '../ys/artifactFilter'
import { ref } from 'vue'
import { useStore } from '../store';
import ArtifaceFilterPanel from './ArtifactFilterPanel.vue'
import ArtifaceFilterBatchPanel from './ArtifactFilterBatchPanel.vue'
const store = useStore()
let artifactFilter = new ArtifactFilter();
let showFilter = ref(false);
const updateArtifactFilter = (filter: ArtifactFilter) => {
    artifactFilter = filter
    // this.isFiltering = true
    // this.selectedIds = []
}
const disableFilterBatch = () => {
    store.commit('filterBatchIndex', -1)
    // store.dispatch('updFilteredArtifacts')
    ElNotification({
        type: 'success',
        title: '取消过滤规则成功',
        message: '请再次开始计算应用新过滤策略',
    })
}

const useFilterPro = (use: boolean) => {
    store.commit('useFilterPro', { use })
    store.state.useFilterBatch = -1
}
const setFilter = (key: string, value: any) => {
    store.commit('setFilter', { key, value })
}
const setFilterPro = (key: string, value: any) => {
    store.commit('setFilterPro', { key, value })
}
const selectAll = (filterProKey: string, items: Array<{ key: string, value: string }>) => {
    let keys = []
    for (let i of items) {
        keys.push(i.key)
    }
    store.commit('setFilterPro', { key: filterProKey, value: keys })
}
const deselectAll = (filterProKey: string) => {
    store.commit('setFilterPro', { key: filterProKey, value: [] })
}

</script>


<template>
    <div class="section">
        <section-title title="筛选">
            <span v-show="store.state.useFilterPro" @click="useFilterPro(false)">基本</span>
            <span v-show="!store.state.useFilterPro" @click="useFilterPro(true)">高级</span>
        </section-title>
        <div class="section-content" v-show="!store.state.useFilterPro">
            <div class="filter">
                <span class="filter-name">套装：</span>
                <drop-select
                    class="filter-ctrl"
                    :items="store.getters.filterSets"
                    :model-value="store.state.filter.set"
                    @update:model-value="setFilter('set', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">部位：</span>
                <drop-select
                    class="filter-ctrl"
                    :items="store.getters.filterSlots"
                    :model-value="store.state.filter.slot"
                    @update:model-value="setFilter('slot', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">主词条：</span>
                <drop-select
                    class="filter-ctrl"
                    :items="store.getters.filterMains"
                    :model-value="store.state.filter.main"
                    @update:model-value="setFilter('main', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">角色：</span>
                <drop-select
                    class="filter-ctrl"
                    :items="store.getters.filterLocations"
                    :model-value="store.state.filter.location"
                    @update:model-value="setFilter('location', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">锁：</span>
                <drop-select
                    class="filter-ctrl"
                    :items="store.getters.filterLocks"
                    :model-value="store.state.filter.lock"
                    @update:model-value="setFilter('lock', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">等级：</span>
                <range-slider
                    class="filter-ctrl"
                    :model-value="store.state.filter.lvRange"
                    @update:model-value="setFilter('lvRange', $event)"
                />
            </div>
            <div class="filter">
                <span class="filter-name">评分：</span>
                <range-slider
                    class="filter-ctrl"
                    :model-value="store.state.filter.score"
                    @update:model-value="setFilter('score', $event)"
                />
            </div>
        </div>
        <div class="section-content" v-show="store.state.useFilterPro">
            <div class="filter-detail">{{ store.state.useFilterBatch != -1 ? '启用过滤规则：' + (store.state.filterBatch[store.state.useFilterBatch].comment ? store.state.filterBatch[store.state.useFilterBatch].comment : '无名称注释') : '' }}</div>
            <div class="filter-button">
                <text-button @click="showFilter = true;" style="width: 100px">显示过滤规则</text-button>
                <text-button v-show="store.state.useFilterBatch != -1" @click="disableFilterBatch">取消选择</text-button>
            </div>
            <artifact-filter-batch-panel v-model:show="showFilter" />
        </div>
    </div>
</template>

<style lang="scss">
.filter {
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
    .filter-name {
        flex: 1;
        color: #444;
    }
    .filter-ctrl {
        width: 300px;
    }
}
.check {
    --el-checkbox-font-size: 16px;
    --el-checkbox-font-weight: bold;
    --el-checkbox-text-color: #444;
    height: 30px;
    &.p2 {
        width: 170px;
    }
    &.p3 {
        width: 100px;
    }
    &.p5 {
        width: 50px;
    }
}
.filter-button {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
}
.filter-detail {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    color: #A00
}
</style>