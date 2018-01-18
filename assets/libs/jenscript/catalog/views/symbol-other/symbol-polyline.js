
/**
 * Create view with polyline symbol
 * 
 * @param container
 * @param width
 * @param height
 */
function createViewSymbolPolyline(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		
		west : 80,
		south:60
	});
	
	var bg1 = new JenScript.GradientViewBackground();
	view.addViewBackground(bg1);
	var textureBackground = new JenScript.TexturedViewBackground({
		opacity : 0.3,
		texture : JenScript.Texture.getTriangleCarbonFiber(),
		strokeColor : 'cyan',
		strokeWidth : 2,
		cornerRadius : 0
	});
	view.addViewBackground(textureBackground);

	var gloss = new JenScript.GlossViewForeground();
	view.addViewForeground(gloss);

	var proj = new JenScript.LinearProjection({
		name : "proj",
		paintMode : 'ACTIVE',
		minX : 0,
		maxX : 0,
		minY : -100,
		maxY : 1200
	});
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});

	proj.registerPlugin(outline);
	
	var metrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : {
			tickMarkerSize : 2,
			tickMarkerColor : JenScript.RosePalette.AEGEANBLUE,
			tickMarkerStroke : 1
		},
		median : {
			tickMarkerSize : 4,
			tickMarkerColor : JenScript.RosePalette.EMERALD,
			tickMarkerStroke : 1.2,
			tickTextColor : JenScript.RosePalette.EMERALD,
			tickTextFontSize : 10
		},
		major : {
			tickMarkerSize : 8,
			tickMarkerColor : JenScript.RosePalette.TURQUOISE,
			tickMarkerStroke : 3,
			tickTextColor : JenScript.RosePalette.TURQUOISE,
			tickTextFontSize : 12
		}
	});
	proj.registerPlugin(metrics);
	
	var gridPlugin = new JenScript.GridModeledPlugin({
		gridOrientation : 'Horizontal',
		gridColor : 'white',
		gridWidth : 0.5,
		gridOpacity : 0.5
	});
	proj.registerPlugin(gridPlugin);
	
	//TOOL
	var tx1 = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx1);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
	}));
	tx1.select();
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({
		mode : 'wheelY'
	});
	proj.registerPlugin(zoomwheel);
	
	//BAR
	var symbolPlugin = new JenScript.SymbolPlugin({
		nature : 'Vertical'
	});
	proj.registerPlugin(symbolPlugin);
	
	var layer = new JenScript.SymbolPointLayer();
	symbolPlugin.addLayer(layer);
	
    
	var p1 = new JenScript.SymbolPoint({
		value: 200,
		themeColor : JenScript.Color.brighten('rgb(53, 121, 170)',40),
	});
	var p2 = new JenScript.SymbolPoint({
		value: 400,
		themeColor : JenScript.Color.brighten('rgb(53, 121, 170)',40),
	});
	var p3 = new JenScript.SymbolPoint({
		value: 800,
		themeColor : JenScript.Color.brighten('rgb(53, 121, 170)',40),
	});
	var p4 = new JenScript.SymbolPoint({
		value: 400,
		themeColor : JenScript.Color.brighten('rgb(53, 121, 170)',40),
	});
	var p5 = new JenScript.SymbolPoint({
		value: 200,
		themeColor : JenScript.Color.brighten('rgb(53, 121, 170)',40),
	});
	
	var polyline = new JenScript.SymbolPolylinePoint({
		themeColor : JenScript.Color.brighten('rgb(53, 121, 170)',40),
	});
	polyline.addSymbol(p1);
	polyline.addSymbol(p2);
	polyline.addSymbol(p3);
	polyline.addSymbol(p4);
	polyline.addSymbol(p5);
	
	layer.addSymbol(JenScript.SymbolFiller.createGlue());
	layer.addSymbol(p1);
	layer.addSymbol(JenScript.SymbolFiller.createStrut(40));
	layer.addSymbol(p2);
	layer.addSymbol(JenScript.SymbolFiller.createStrut(40));
	layer.addSymbol(p3);
	layer.addSymbol(JenScript.SymbolFiller.createStrut(40));
	layer.addSymbol(p4);
	layer.addSymbol(JenScript.SymbolFiller.createStrut(40));
	layer.addSymbol(p5);
	layer.addSymbol(JenScript.SymbolFiller.createGlue());
	
	
	layer.addSymbol(polyline); //does not contribute to filling
	
}
