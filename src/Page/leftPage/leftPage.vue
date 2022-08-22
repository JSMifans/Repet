<template>
	<div id="leftPage">
		<div class="back"></div>
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
				<div class="item" v-for="(item, index) in 6" :key="index">
					<div :class="[indexNow === index ? 'item-is-bg' : 'item-bg']" @click="clickTab(index)">
						<div class="item-sub-img"></div>
					</div>
					<div class="text">水位</div>
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
const indexNow = ref(0)
function clickTab(index) {
	indexNow.value = index
}
onMounted(() => {
	let mapchart = new CityMap('map-container').init()
})
</script>
