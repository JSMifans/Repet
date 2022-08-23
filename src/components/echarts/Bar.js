import * as echarts from 'echarts'

class Bar {
	constructor(el) {
		this.el = el
	}
	init() {
		let bar = echarts.init(document.getElementById(this.el))
		let option = {
			legend: {
				data: ['高水位', '低水位'],
				right: 0,
				top: 10,
				textStyle: {
					fontSize: 30,
					color: '#fff',
				},
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985',
					},
				},
			},
			xAxis: {
				type: 'category',
				data: ['2022/07/10', '2022/07/10', '2022/07/10', '2022/07/10'],
				axisLabel: {
					textStyle: {
						fontSize: 25,
						color: '#fff',
					},
				},
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					textStyle: {
						color: '#fff',
						fontSize: 25,
					},
				},
				splitLine: {
					//网格线
					lineStyle: {
						type: 'dashed', //设置网格线类型 dotted：虚线   solid:实线
						width: 2,
					},
					show: true, //隐藏或显示
				},
			},
			series: [
				{
					name: '高水位',
					type: 'bar',
					data: [12.0, 41.9, 27.0, 23.2, 25.6],
				},
				{
					name: '低水位',
					type: 'bar',
					data: [12.6, 51.9, 92.0, 26.4, 28.7],
				},
			],
		}
		bar.setOption(option)
	}
}

export default Bar
