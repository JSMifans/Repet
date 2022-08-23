<template>
	<div id="leftPage">
		<div id="back" :class="[isBack ? 'back' : 'isBack']" @click="toggle"></div>
		<div class="map-echart">
			<TitleVue></TitleVue>
			<div id="map-container"></div>
			<div class="rain-pingfang">
				<img src="../../assets/images/count.png" alt="" />
				<div class="count">总库存</div>
				<div class="num">1902.8</div>
				<div class="unit">M²</div>
				<img src="../../assets/images/mappei.png" alt="" srcset="" />
			</div>
		</div>
		<div class="table-xuncha">
			<TitleVue></TitleVue>
			<TableVue></TableVue>
		</div>
		<div class="search-container">
			<div class="search-input">
				<img class="search-img" src="../../assets/images/search.png" alt="" />
				<input class="input" type="text" placeholder="请输入搜索内容" />
			</div>
			<div class="search-content">
				<div class="item" v-for="(item, index) in searchArray" :key="index">
					<div :class="[indexNow === index ? 'item-is-bg' : 'item-bg']" @click="clickTab(index)">
						<!-- <div class="item-sub-img"></div> -->
						<img v-if="indexNow === index" :src="item.urlActive" alt="" />
						<img v-if="indexNow !== index" :src="item.url" alt="" />
					</div>
					<div class="text">{{ item.text }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
@import './leftPage.less';
</style>
<script setup>
import TitleVue from '../../components/Title/Title.vue'
import TableVue from '../../components/Table/Table.vue'
import { onMounted, ref } from 'vue'
import CityMap from '../../components/echarts/City'
const searchArray = [
	{
		text: '水位',
		url: './src/assets/images/icon.png',
		urlActive: './src/assets/images/icon_is.png',
	},
	{
		text: '阀门',
		url: './src/assets/images/value.png',
		urlActive: './src/assets/images/value-is.png',
	},
	{
		text: '水泵',
		url: './src/assets/images/pump.png',
		urlActive: './src/assets/images/pump-is.png',
	},
	{
		text: '摄像头',
		url: './src/assets/images/camera.png',
		urlActive: './src/assets/images/camera-is.png',
	},
]
const indexNow = ref(0)
const isBack = ref(true)
function clickTab(index) {
	indexNow.value = index
}

function toggle() {
	let div = document.getElementById('leftPage')
	let back = document.getElementById('back')
	if (isBack.value) {
		div.style.left = '-2304px'
		setTimeout(() => {
			isBack.value = !isBack.value
		}, 1000)
	} else {
		div.style.left = '0'
		isBack.value = !isBack.value
	}
}
onMounted(() => {
	let mapchart = new CityMap('map-container').init()
})
</script>
