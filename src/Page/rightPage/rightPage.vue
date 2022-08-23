<template>
	<div id="rightPage">
		<div :class="[isBack ? 'opens' : 'isOpens']" class="opens" id="opens" @click="toggle"></div>
		<div class="tabFlower">
			<div
				@click="clickTab(index)"
				:class="[tabIndex === index ? 'isItem' : 'item']"
				v-for="(item, index) in tabArray"
				:key="index"
			>
				{{ item }}
			</div>
		</div>
		<div class="right-one">
			<div class="bar-chart">
				<TitleVue title-text="河湖统计" title-us="HEHU TONGJI"></TitleVue>
				<div id="bar-container"></div>
			</div>
			<div class="video-chart">
				<TitleVue title-text="视频融合" title-us="HEHU TONGJI"></TitleVue>
				<div class="video-chart-contianer">
					<div class="item" v-for="(item, index) in 6" :key="index">
						<img class="img" src="../../assets/images/video-container.png" alt="" />
						<div class="text ellipsis">颐和路288号</div>
					</div>
				</div>
			</div>
			<div class="line-cahrt">
				<TitleVue title-text="位移趋势统计" title-us="HEHU TONGJI"></TitleVue>
				<div id="line-container"></div>
			</div>
		</div>

		<div class="right-two">
			<div class="jiankong-chart">
				<TitleVue title-text="视频监控" title-us="HEHU TONGJI"></TitleVue>
				<div class="jiankong-container">
					<div class="item" v-for="(item, index) in 4" :key="index">
						<div class="video-item">
							<VideoComponentBVue
								src="http://112.20.185.196:17086/live/cameraid/1000001%241/substream/1.m3u8"
								:index="index"
							></VideoComponentBVue>
						</div>
						<div class="ellipsis text">颐和路28号门口</div>
					</div>
				</div>
			</div>
			<div class="yujing-chart">
				<TitleVue title-text="预警信息" title-us="HEHU TONGJI"></TitleVue>
				<div class="yujing-table">
					<TablesVue></TablesVue>
				</div>
			</div>
			<div id="zhu-chart"></div>
		</div>
	</div>
</template>
<style lang="less" scoped>
@import './rightPage.less';
</style>

<script setup>
import TitleVue from '../../components/Title/Title.vue'
import VideoComponentBVue from '../../components/VideoComponent/VideoComponentB.vue'
import TablesVue from '../../components/Tables/Table.vue'
import { onMounted, ref } from 'vue'
import Bar3D from '../../components/echarts/Bar3D'
import LineChart from '../../components/echarts/Line'
import Bar from '../../components/echarts/Bar'
const tabArray = ['北京市', '海淀区', '监控大楼']
const tabIndex = ref(0)
const isBack = ref(true)
function clickTab(index) {
	tabIndex.value = index
}
function toggle() {
	let div = document.getElementById('rightPage')
	let back = document.getElementById('opens')
	if (isBack.value) {
		div.style.right = '-2134px'
		setTimeout(() => {
			isBack.value = !isBack.value
		}, 1000)
	} else {
		div.style.right = '0'
		isBack.value = !isBack.value
	}
}
onMounted(() => {
	let bar3d = new Bar3D('bar-container').init()
	let line = new LineChart('line-container').init()
	let bar = new Bar('zhu-chart').init()
})
</script>
