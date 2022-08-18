<template>
	<div id="cesiumContainer"></div>
</template>

<script setup>
import MViewer from '@/components/cesium/MViewer'
import { onMounted } from 'vue'

onMounted(() => {
	const viewer = new MViewer('cesiumContainer').init()
})
</script>

<style lang="less"></style>
