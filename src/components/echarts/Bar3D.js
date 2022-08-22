import * as echarts from 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts-gl'

class Bar3D {
	constructor(el) {
		this.el = el
		this.data = [
			{ name: '类别1', value: 40 },
			{ name: '类别2', value: 40 },
			{ name: '类别3', value: 20 },
		]
	}
	init() {
		console.log(this.el)
		var myChart = echarts.init(document.getElementById(this.el))
		var color = ['#07D1FA', '#FFD15C', '#0783FA']
		this.data.forEach((item, index) => {
			item.itemStyle = {
				color: color[index],
				opacity: 1,
			}
		})
		let option = this.getPie3D(this.data)
		myChart.setOption(option)
		window.addEventListener('resize', () => {
			myChart.resize()
		})
	}
	getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
		// 计算
		let midRatio = (startRatio + endRatio) / 2

		let startRadian = startRatio * Math.PI * 2
		let endRadian = endRatio * Math.PI * 2
		let midRadian = midRatio * Math.PI * 2

		// 如果只有一个扇形，则不实现选中效果。
		if (startRatio === 0 && endRatio === 1) {
			isSelected = false
		}

		// 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
		k = 1

		// 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
		let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
		let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

		// 计算高亮效果的放大比例（未高亮，则比例为 1）
		let hoverRate = isHovered ? 1.05 : 1

		// 返回曲面参数方程
		return {
			u: {
				min: -Math.PI,
				max: Math.PI * 3,
				step: Math.PI / 32,
			},

			v: {
				min: 0,
				max: Math.PI * 2,
				step: Math.PI / 20,
			},

			x: function (u, v) {
				if (u < startRadian) {
					return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
				}
				if (u > endRadian) {
					return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
				}
				return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
			},

			y: function (u, v) {
				if (u < startRadian) {
					return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
				}
				if (u > endRadian) {
					return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
				}
				return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
			},

			z: function (u, v) {
				if (u < -Math.PI * 0.5) {
					return Math.sin(u)
				}
				if (u > Math.PI * 2.5) {
					return Math.sin(u) * h * 0.1
				}
				return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
			},
		}
	}
	getPie3D(pieData, internalDiameterRatio) {
		let series = []
		let sumValue = 0
		let startValue = 0
		let endValue = 0
		let legendData = []
		let k =
			typeof internalDiameterRatio !== 'undefined'
				? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
				: 1 / 3

		// 为每一个饼图数据，生成一个 series-surface 配置
		for (let i = 0; i < pieData.length; i++) {
			sumValue += pieData[i].value

			let seriesItem = {
				name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
				value: typeof pieData[i].value === 'undefined' ? `series${i}` : pieData[i].value,
				type: 'surface',
				parametric: true,
				wireframe: {
					show: false,
				},
				pieData: pieData[i],
				pieStatus: {
					selected: false,
					hovered: false,
					k: k,
				},
			}

			if (typeof pieData[i].itemStyle != 'undefined') {
				let itemStyle = {}

				typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null
				typeof pieData[i].itemStyle.opacity != 'undefined'
					? (itemStyle.opacity = pieData[i].itemStyle.opacity)
					: null

				seriesItem.itemStyle = itemStyle
			}
			series.push(seriesItem)
		}
		// 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
		// 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
		for (let i = 0; i < series.length; i++) {
			endValue = startValue + series[i].pieData.value
			series[i].pieData.startRatio = startValue / sumValue
			series[i].pieData.endRatio = endValue / sumValue
			series[i].parametricEquation = this.getParametricEquation(
				series[i].pieData.startRatio,
				series[i].pieData.endRatio,
				false,
				false,
				k,
				series[i].pieData.value
			)

			startValue = endValue
			legendData.push(series[i].name)
		}

		// 补充一个透明的圆环，用于支撑高亮功能的近似实现。
		series.push(
			{
				type: 'surface',
				parametric: true,
				wireframe: {
					show: false,
				},
				itemStyle: {
					opacity: 0,
				},
				parametricEquation: {
					u: {
						min: 0,
						max: Math.PI * 2,
						step: Math.PI / 20,
					},
					v: {
						min: 0,
						max: Math.PI,
						step: Math.PI / 20,
					},
					x: function (u, v) {
						return Math.sin(v) * Math.sin(u) + Math.sin(u)
					},
					y: function (u, v) {
						return Math.sin(v) * Math.cos(u) + Math.cos(u)
					},
					z: function (u, v) {
						return Math.cos(v) > 0 ? 0.1 : -0.1
					},
				},
			},
			{
				// name: 'pie2d',
				// type: 'pie',
				// // labelLine: {
				// // 	length: 30,
				// // 	length2: 30,
				// // },
				// startAngle: -30, //起始角度，支持范围[0, 360]。
				// clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
				// radius: ['40%', '40%'],
				// center: ['50%', '50%'], //指示线的位置
				// data: this.data,
				// itemStyle: {
				// 	opacity: 0,
				// },
			}
		)

		// 准备待返回的配置项，把准备好的 legendData、series 传入。
		let option = {
			legend: {
				top: 400,
				textStyle: {
					fontSize: 30,
					color: '#fff',
					padding: [3, 4],
				},
				itemWidth: 50,
				itemHeight: 20,
			},
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					debugger
				},
			},
			labelLine: {
				show: true,
				lineStyle: {
					// color: '#fff'
				},
			},

			xAxis3D: {
				min: -1,
				max: 1,
			},
			yAxis3D: {
				min: -1,
				max: 1,
			},
			zAxis3D: {
				min: -1,
				max: 1,
			},
			grid3D: {
				show: false,
				boxHeight: 30,
				viewControl: {
					//3d效果可以放大、旋转等，请自己去查看官方配置
					alpha: 40,
					beta: 40,
					distance: 500,
					rotateSensitivity: 0,
					zoomSensitivity: 0,
					panSensitivity: 0,
					autoRotate: false,
				},
			},
			series: series,
		}
		return option
	}
}

export default Bar3D
