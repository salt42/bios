
/**
 * Create view with simple stacked bar symbol
 * 
 * @param container
 * @param width
 * @param height
 */
function createViewBarStackedVSymbol(container, width, height) {

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
	
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	
    
	var bar = new JenScript.SymbolBarStacked({
		name : 'the stacked bar',
		base : 0,
		value: 800,
		thickness : 32,
		direction : 'ascent',
		morpheStyle : 'Round',
		round : 8,
		//themeColor : JenScript.Color.brighten('rgb(53, 121, 170)',40),
		//opacity : 1,
	});
	
	var  s1 = new JenScript.SymbolStack({
		name : 'stack1',
		themeColor : JenScript.Color.brighten(JenScript.RosePalette.EMERALD,10),
		stackValue : 10
	});
	var  s2 = new JenScript.SymbolStack({
		name : 'stack2',
		themeColor : JenScript.Color.brighten(JenScript.RosePalette.EMERALD,30),
		stackValue : 20
	});
	var  s3 = new JenScript.SymbolStack({
		name : 'stack3',
		themeColor : JenScript.Color.brighten(JenScript.RosePalette.EMERALD,60),
		stackValue : 40
	});
	
	bar.addStack(s1);
	bar.addStack(s2);
	bar.addStack(s3);
	
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue());
	barLayer.addSymbol(bar);
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue());
	
	
}
