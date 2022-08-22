// VideoComponentB.vue
<template>
	<video
		v-if="src"
		:id="videoId"
		class="video-js vjs-default-skin my-video"
		autoplay
		muted
		controls
		preload="auto"
		style="width: 100%; height: 100%"
	>
		<source :src="src" type="application/x-mpegURL" style="width: 100%; height: 100%" />
	</video>
</template>

<script>
import videojs from 'video.js/dist/video.min'
import 'video.js/dist/video-js.min.css'
import { defineComponent, watch, onMounted, onBeforeUnmount, computed } from 'vue'

export default defineComponent({
	name: 'VideoItem',

	props: {
		// 视频地址
		src: {
			type: String,
			required: true,
		},
		// 视频列表中每个视频的索引值
		index: {
			type: Number,
			default: 0,
		},
	},

	setup(props) {
		// 监听视频地址变化
		watch(
			() => props.src,
			(n) => {
				changeVideoSource(n)
			}
		)

		// 在onMounted阶段进行初始化
		onMounted(() => {
			initVideo()
		})

		// 在onBeforeUnmount阶段释放资源
		onBeforeUnmount(() => {
			disposeVideo()
		})

		// 用于多视频列表区分每个视频的id
		const videoId = computed(() => {
			return 'my-video' + props.index
		})
		// 初始化视频
		function initVideo() {
			if (!props.src) return

			videojs(
				videoId.value,
				{
					bigPlayButton: true,
					textTrackDisplay: true,
					posterImage: false,
					errorDisplay: false,
					controlBar: true,
				},
				() => {
					const myPlayer = videojs(videoId.value)
					myPlayer.play()
					myPlayer.on('error', () => {
						//  ..
					})
				}
			)
		}
		// 视频地址发生变化时的处理
		function changeVideoSource(src) {
			if (!src) return

			const myPlayer = videojs(videoId.value)
			myPlayer.src([
				{
					type: 'application/x-mpegURL',
					src: src,
				},
			])
			myPlayer.play()
		}
		function disposeVideo() {
			const myPlayer = videojs(videoId.value)
			myPlayer.dispose()
		}

		return {
			videoId,
		}
	},
})
</script>
