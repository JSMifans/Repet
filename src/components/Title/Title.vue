<template>
	<div class="title-conponent">
		<img class="titile-img" src="../../assets/images/title-top.png" alt="" />
		<div class="text">{{ titleText }}</div>
		<div class="us">{{ titleUs }}</div>
		<img class="title-bottom" src="../../assets/images/title-bottom.png" alt="" />
	</div>
</template>
<script setup>
defineProps({
	titleText: {
		type: String,
		default: '海淀区概况',
	},
	titleUs: {
		type: String,
		default: 'HAIDIAN GAIKUANG',
	},
})
</script>

<style lang="less">
.title-conponent {
	width: 100%;
	height: 105px;
	// border: 1px solid red;
	background: url('../../assets/images/titlebg.png') no-repeat;
	background-size: 100% 100%;
	display: flex;
	align-items: center;
	position: relative;
	.titile-img {
		width: 56px;
		height: 77px;
		margin-left: 72px;
	}
	.text {
		margin-left: 50px;
		font-size: 54px;
	}
	.us {
		font-size: 42px;
		color: rgba(55, 160, 255, 1);
		position: absolute;
		right: 100px;
	}
	.title-bottom {
		position: absolute;
		right: 0;
		bottom: 0;
	}
}
</style>
