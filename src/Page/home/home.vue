<template>
	<ScreenAdapterVue>
		<div id="cesiumContainer">
			<headVue></headVue>
			<contentVue></contentVue>
		</div>
	</ScreenAdapterVue>
</template>

<script setup>
import MViewer from '@/components/cesium/MViewer'
import ScreenAdapterVue from '../../components/ScreenAdapter/ScreenAdapter.vue'
import headVue from '../head/head.vue'
import contentVue from '../content/content.vue'
import { onMounted, ref } from 'vue'

onMounted(() => {
	let viewer = new MViewer('cesiumContainer').init()
	console.log(viewer)
})
</script>

<style>
#cesiumContainer {
	z-index: 1;
}
.btn {
	color: #fff;
	position: absolute;
	top: 10px;
	z-index: 10;
	cursor: pointer;
}
</style>
