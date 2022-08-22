<template>
	<div id="center">
		<div
			:class="[tabindex === index ? 'item' : 'items']"
			v-for="(item, index) in tabAarry"
			:key="index"
			@click="tabClick(index)"
		>
			<img v-if="tabindex === index" class="item-img" src="../../assets/images/vector.png" alt="" />
			<img class="icon" :src="item.url" alt="" />
			<div class="text">{{ item.text }}</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const tabindex = ref(0)
const tabAarry = [
	{
		url: './src/assets/images/ranging.png',
		text: '测距',
	},
	{
		url: './src/assets/images/surface.png',
		text: '测面',
	},
	{
		url: './src/assets/images/biaoji.png',
		text: '标记',
	},
	{
		url: './src/assets/images/tuceng.png',
		text: '图层',
	},
	{
		url: './src/assets/images/shijiao.png',
		text: '视角',
	},
	{
		url: './src/assets/images/reset.png',
		text: '重置',
	},
]
function tabClick(index) {
	tabindex.value = index
}
</script>

<style lang="less" scoped>
@import './center.less';
</style>
