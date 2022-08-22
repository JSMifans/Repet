<template>
	<div id="head">
		<div class="left">
			<div class="city">北京市</div>
			<div class="tianqi"><img src="../../assets/images/rain.png" alt="" class="img" /></div>
			<div class="text-rain">大雨</div>
			<div class="wendu">17-18℃</div>
		</div>
		<div class="right">
			<div class="time">{{ moment }}</div>
			<div class="week">星期一</div>
			<div class="mmddss">{{ timer }}</div>
		</div>
		<div class="admin">
			<div class="admin-img">
				<img src="../../assets/images/header.png" alt="" srcset="" />
			</div>
		</div>
		<div class="asscount">
			<div>admin</div>
			<div>管理员</div>
		</div>
		<div class="title-container">海淀区智慧水务大脑地理信息平台</div>
	</div>
</template>
<style lang="less">
@import './head.less';
</style>
<script setup>
import Day from 'dayjs'
import { onMounted, ref } from 'vue'
const moment = Day().format('YYYY-MM-DD')
const timer = ref(null)

onMounted(() => {
	setInterval(() => {
		timer.value = Day().format('HH:mm:ss')
	}, 1000)
})
</script>
