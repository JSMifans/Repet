import cityJson from '../../cityJson/haidian.json'
import * as echarts from 'echarts'
class CityMap {
	constructor(el) {
		this.el = el
		this.map = null
	}
	init() {
		console.log(this.el)
		this.map = echarts.init(document.getElementById(this.el))
		echarts.registerMap('haidian', cityJson) //mapData即为json数据
		let option = {
			tooltip: {
				trigger: 'item',
			},
			geo: {
				// 地图配置
				show: true,
				map: 'haidian',
				label: {
					normal: {
						show: false,
					},
					emphasis: {
						show: false,
					},
				},
				roam: false,
				itemStyle: {
					normal: {
						areaColor: '#207CD3',
						borderColor: '#3B5077',
					},
					emphasis: {
						areaColor: '#2B91B7',
					},
				},
				zoom: 1.2,
			},
		}
		this.map.setOption(option)
	}
}

export default CityMap
