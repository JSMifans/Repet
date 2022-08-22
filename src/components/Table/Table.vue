<template>
	<div class="table-container">
		<div class="th-container">
			<div v-for="(item, index) in th" :key="index" class="item">
				{{ item }}
			</div>
		</div>
		<div class="td-container">
			<div class="td-over">
				<div class="td" v-for="(item, index) in tdArr" :key="index">
					<div class="item ellipsis">{{ item.time }}</div>
					<div class="item ellipsis">{{ item.rain }}</div>
					<div class="item ellipsis">{{ item.rainUnit }}</div>
					<div class="item ellipsis">{{ item.content }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
const th = ['日期', '河段', '河长', '具体问题']
const td = {
	time: '2022-8-27',
	rain: '北京颐和路',
	rainUnit: '1200M',
	content: '河面有漂浮杂物,河面有漂浮杂物',
}
const tdArr = []
for (let index = 0; index < 30; index++) {
	tdArr.push(td)
}
const indexNum = 3
</script>

<style lang="less">
@import './table.less';
</style>
