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
					<img class="error" src="../../assets/images/error.png" alt="" />
					<div class="item ellipsis">{{ item.time }}</div>
					<div class="item ellipsis">{{ item.rain }}</div>
					<div class="item ellipsis">{{ item.content }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
const th = ['时间', '名称', '内容']
const td = {
	time: '2022/7/21',
	rain: '皇家水坝',
	content: '河面有漂浮杂物,河面有漂浮杂物',
}
const tdArr = []
for (let index = 0; index < 30; index++) {
	tdArr.push(td)
}
const indexNum = 3
</script>

<style lang="less" scoped>
@import './table.less';
</style>
