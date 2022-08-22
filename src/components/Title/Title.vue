<template>
	<div class="title-conponent">
		<img class="titile-img" src="../../assets/images/title-top.png" alt="" />
		<div class="text">海淀区概况</div>
		<div class="us">HAIDIAN GAIKUANG</div>
		<img class="title-bottom" src="../../assets/images/title-bottom.png" alt="" />
	</div>
</template>
<style lang="less">
.title-conponent {
	width: 1228px;
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
		margin-left: 220px;
		color: rgba(55, 160, 255, 1);
	}
	.title-bottom {
		position: absolute;
		right: 0;
		bottom: 0;
	}
}
</style>
