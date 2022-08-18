import * as Cesium from 'cesium'
class MViewer {
	constructor(el) {
		this.el = el
		this.view = null
	}
	init() {
		this.view = new Cesium.Viewer(this.el, {
			baseLayerPicker: false,
			// imageryProvider: this.provider, // 图像
			animation: false,
			homeButton: false,
			fullscreenButton: false,
			vrButton: false,
			infoBox: false,
			timeline: false,
			terrainProvider: Cesium.createWorldTerrain({
				// 3D的地形 和 水的流动
				requestWaterMask: true,
				requestVertexNormals: true,
			}),
		})
		// 设置位置 和 视角
		this.view.camera.setView({
			destination: Cesium.Cartesian3.fromDegrees(118.78, 32.07, 100),
			orientation: {
				heading: 0.6,
				pitch: -0.66,
				// pitch: Cesium.Math.toRadians(45),
			},
		})
		this.view.scene.primitives.add(
			new Cesium.Cesium3DTileset({
				url: Cesium.IonResource.fromAssetId(3839),
			})
		)
	}
}

export default MViewer
