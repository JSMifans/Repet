<template>
	<ScreenAdapterVue>
		<div id="cesiumContainer">
			<headVue></headVue>
			<leftPageVue></leftPageVue>
			<rightPageVue> </rightPageVue>
			<centerVue></centerVue>
		</div>
	</ScreenAdapterVue>
</template>

<script setup>
import MViewer from '@/components/cesium/MViewer'
import ScreenAdapterVue from '../../components/ScreenAdapter/ScreenAdapter.vue'
import headVue from '../head/head.vue'
import leftPageVue from '../leftPage/leftPage.vue'
import rightPageVue from '../rightPage/rightPage.vue'
import centerVue from '../center/center.vue'
import { onMounted, ref } from 'vue'
const isShow = ref(true)
function toggle() {
	isShow.value = !isShow.value
}
onMounted(() => {
	// let viewer = new MViewer('cesiumContainer').init()
	// console.log(viewer)
})
</script>

<style>
#cesiumContainer {
	z-index: 1;
	background-color: rgba(13, 83, 158, 0.6);
}
</style>
