<script setup lang="ts">
import LayoutTop from '@/components/layouts/LayoutTop.vue';
import LayoutLeft from '@/components/layouts/LayoutLeft.vue';
import LayoutRight from '@/components/layouts/LayoutRight.vue';
import { useStore } from '@/store';
const store = useStore()
const loadingSrc = './assets/loading.gif'
store.dispatch('setWebSocket', { ws: new URLSearchParams(window.location.hash.slice(1)).get('ws') })
// watch(() => props.ws, (ws) => {
//     store.dispatch('setWebSocket', { ws })
// })
</script>

<template>
    <layout-top />
    <div id="left-right">
        <layout-left />
        <layout-right />
    </div>
    <transition name="fade">
        <div class="modal" v-show="store.state.loading">
            <img :src="loadingSrc" />
        </div>
    </transition>
</template>

<style lang="scss">
#app {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    font-size: 16px;
    // font-weight: bold;
    user-select: none;
    #left-right {
        flex: 1;
        display: flex;
        overflow: hidden;
    }
}
.modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fffa;
    color: black;
}
</style>
