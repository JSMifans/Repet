import * as Cesium from 'cesium'
class MViewer {
	constructor(el) {
		this.el = el
		this.view = null
		this.option = {
			baseLayerPicker: false,
			// imageryProvider: this.provider, // 图像
			animation: false,
			homeButton: false,
			fullscreenButton: false,
			vrButton: false,
			infoBox: false,
			timeline: false,
			geocoder: false,
			sceneModePicker: false,
			navigationHelpButton: false,
			terrainProvider: Cesium.createWorldTerrain({
				// 3D的地形 和 水的流动
				requestWaterMask: true,
				requestVertexNormals: true,
			}),
		}
	}
	init() {
		Cesium.Ion.defaultAccessToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNmEzYjI4ZS01N2U4LTQyYWUtYmRhNS04YTllZmYwMmZjM2EiLCJpZCI6MTAyNjM1LCJpYXQiOjE2NTg4NTEzNzF9.pLFs9Ej-JoR6X-XMKJBRY2TzQ26SDc9dPyDmPxXZ6W8'
		this.view = new Cesium.Viewer(this.el, this.option)
		this.view._cesiumWidget._creditContainer.style.display = 'none' //隐藏版本信息
		this.initCamera()
		this.addMap()
		this.initBoundary()
		this.initGrass()
		this.initRailway()
		this.initRoadLines()
		this.initFactory()
		this.cameraJson()
	}
	initCamera() {
		const center = Cesium.Cartesian3.fromDegrees(116.3, 39.95)
		const heading = Cesium.Math.toRadians(50)
		const pitch = Cesium.Math.toRadians(-90)
		const range = 2000
		this.view.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(116.3, 39.95, 20000),
			orientation: {},
			duration: 5,
		})
		// this.view.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range))
	}
	initBoundary() {
		const url = './src/geoJson/boundary.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url, { clampToGround: true })
		this.view.dataSources.add(dataSources).then((dataSource) => {
			let entities = dataSource.entities.values
			for (let index = 0; index < entities.length; index++) {
				const entity = entities[index]
				entity.polygon.fill = false
				entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.5)
			}
		})
	}
	initGrass() {
		const url = './src/geoJson/grass.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url, { clampToGround: true })
		this.view.dataSources.add(dataSources).then((dataSource) => {
			let entities = dataSource.entities.values
			for (let index = 0; index < entities.length; index++) {
				const entity = entities[index]
				entity.polygon.fill = false
				// entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.5)
			}
		})
	}
	initRailway() {
		const url = './src/geoJson/railway.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url, { clampToGround: true })
		this.view.dataSources.add(dataSources).then((dataSource) => {
			let entities = dataSource.entities.values
			for (let index = 0; index < entities.length; index++) {
				const entity = entities[index]

				// entity.polygon.fill = false
				// entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.5)
			}
		})
	}
	initRoadLines() {
		const url = './src/geoJson/roadlines.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url, { clampToGround: true })
		this.view.dataSources.add(dataSources).then((dataSource) => {
			let entities = dataSource.entities.values
			for (let index = 0; index < entities.length; index++) {
				const entity = entities[index]

				// entity.polygon.fill = false
				// entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.5)
			}
		})
	}
	initWater() {
		const url = './src/geoJson/water.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url, { clampToGround: true })
		this.view.dataSources.add(dataSources).then((dataSource) => {
			let entities = dataSource.entities.values
			for (let index = 0; index < entities.length; index++) {
				const entity = entities[index]

				// entity.polygon.fill = false
				// entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.5)
			}
		})
	}
	initFactory() {
		const url = './src/geoJson/factory.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url, { clampToGround: true })
		this.view.dataSources.add(dataSources).then((dataSource) => {
			let entities = dataSource.entities.values
			for (let index = 0; index < entities.length; index++) {
				const entity = entities[index]
				// entity.polygon.fill = false
				// entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.5)
			}
		})
	}
	cameraJson() {
		const url = './src/geoJson/camear.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url, { clampToGround: true })
		this.view.dataSources.add(dataSources).then((dataSource) => {
			let entities = dataSource.entities.values
			for (let index = 0; index < entities.length; index++) {
				const entity = entities[index]
				console.log(entity)
				// entity.polygon.fill = false
				// entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.5)
			}
		})
	}
	addMap() {
		var TDU_Key = '543d7a77ce84c84ef7859f2f8c07f27a' //天地图申请的密钥

		//在线天地图影像服务地址(墨卡托投影)
		var TDT_IMG_W =
			'http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
			'&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
			'&style=default&format=tiles&tk=' +
			TDU_Key
		//在线天地图矢量地图服务(墨卡托投影)
		var TDT_VEC_W =
			'http://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
			'&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
			'&style=default&format=tiles&tk=' +
			TDU_Key
		//在线天地图影像中文标记服务(墨卡托投影)
		var TDT_CIA_W =
			'http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
			'&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
			'&style=default.jpg&tk=' +
			TDU_Key
		//在线天地图矢量中文标记服务(墨卡托投影)
		var TDT_CVA_W =
			'http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
			'&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
			'&style=default.jpg&tk=' +
			TDU_Key
		let Img = new Cesium.WebMapTileServiceImageryProvider({
			//调用影响中文服务
			url: TDT_IMG_W, //url地址
			layer: 'img_w', //WMTS请求的层名称
			style: 'default', //WMTS请求的样式名称
			format: 'tiles', //MIME类型，用于从服务器检索图像
			tileMatrixSetID: 'GoogleMapsCompatible', //	用于WMTS请求的TileMatrixSet的标识符
			subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], //天地图8个服务器
			minimumLevel: 0, //最小层级
			maximumLevel: 18, //最大层级
		})
		var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']

		let TDTlayer = new Cesium.UrlTemplateImageryProvider({
			url: 'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=083966b3f15ae6b884523c3475aea981',
			subdomains: subdomains,
			tilingScheme: new Cesium.WebMercatorTilingScheme(),
			maximumLevel: 18,
		})
		// this.view.imageryLayers.addImageryProvider(TDTlayer)

		let cia = new Cesium.WebMapTileServiceImageryProvider({
			//调用影响中文注记服务
			url: TDT_CIA_W,
			layer: 'cia_w',
			style: 'default',
			format: 'tiles',
			tileMatrixSetID: 'GoogleMapsCompatible',
			subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], //天地图8个服务器
			minimumLevel: 0,
			maximumLevel: 18,
		})

		this.view.imageryLayers.addImageryProvider(cia) //添加到cesium图层上
	}
}

export default MViewer
