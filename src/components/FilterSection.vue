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
        title: '取消过滤器成功',
        message: '请再次开始计算应用新过滤策略',
    })
}
</script>

<template>
    <div class="section">
        <div class="filter-detail">{{ store.state.useFilterBatch != -1 ? '启用过滤器：' + (store.state.filterBatch[store.state.useFilterBatch].comment ? store.state.filterBatch[store.state.useFilterBatch].comment : '无名称注释') : '' }}</div>
        <div class="filter-button">
            <text-button @click="showFilter = true;">显示过滤器</text-button>
            <text-button v-show="store.state.useFilterBatch != -1" @click="disableFilterBatch">取消过滤</text-button>
        </div>
        <artifact-filter-batch-panel v-model:show="showFilter" />
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