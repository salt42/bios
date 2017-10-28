
/**
 * Create 2 projections in paint active mode
 * @param container
 * @param width
 * @param height
 */
function createMultipleProjectionPaintActive(container, width, height) {
	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		
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

	var linear = new JenScript.LinearProjection({
		name : "proj linear",
		paintMode : 'ACTIVE',
		minX : -1000,
		maxX : 1000,
		minY : -1000,
		maxY : 1000
	});
	view.registerProjection(linear);

	var linear2 = new JenScript.LinearProjection({
		name : "proj linear 2",
		paintMode : 'ACTIVE',
		minX : -100,
		maxX : 100,
		minY : -10,
		maxY : 100
	});
	view.registerProjection(linear2);

	var outline = new JenScript.DeviceOutlinePlugin(
			JenScript.RosePalette.AEGEANBLUE);
	var outline2 = new JenScript.DeviceOutlinePlugin(
			JenScript.RosePalette.DEEPHARBOR);
	// plugin can not be shared by projection
	linear.registerPlugin(outline);
	linear2.registerPlugin(outline2);

	var donut3DPlugin = new JenScript.Donut3DPlugin();
	linear.registerPlugin(donut3DPlugin);

	var donut = new JenScript.Donut3D();
	donut3DPlugin.addDonut(donut);

	var s1 = new JenScript.Donut3DSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)'
	});
	var s2 = new JenScript.Donut3DSlice({
		name : "s2",
		value : 5,
		themeColor : 'rgba(37,38,41,1)'
	});
	var s3 = new JenScript.Donut3DSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new JenScript.Donut3DSlice({
		name : "s4",
		value : 5,
		themeColor : 'rgba(22,125,218, 1)'
	});
	var s5 = new JenScript.Donut3DSlice({
		name : "s5",
		value : 5,
		themeColor : 'rgba(61,44,105,1)'
	});

	s2.divergence = 20;
	s4.divergence = 20;

	donut.addSlice(s1);
	donut.addSlice(s2);
	donut.addSlice(s3);
	donut.addSlice(s4);
	donut.addSlice(s5);

	var piePlugin = new JenScript.PiePlugin();
	linear2.registerPlugin(piePlugin);

	var pie = new JenScript.Pie();
	piePlugin.addPie(pie);

	var fill = new JenScript.PieDefaultFill();
	pie.setFill(fill);

	var fx0 = new JenScript.PieLinearEffect();
	pie.addEffect(fx0);
	var fxl = new JenScript.PieReflectionEffect();
	pie.addEffect(fxl);

	var s1 = new JenScript.PieSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)'
	});
	var s2 = new JenScript.PieSlice({
		name : "s2",
		value : 5,
		themeColor : 'rgba(37,38,41,1)'
	});
	var s3 = new JenScript.PieSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new JenScript.PieSlice({
		name : "s4",
		value : 5,
		themeColor : 'rgba(22,125,218, 1)'
	});
	var s5 = new JenScript.PieSlice({
		name : "s5",
		value : 5,
		themeColor : 'rgba(61,44,105,1)'
	});

	pie.addSlice(s1);
	pie.addSlice(s2);
	pie.addSlice(s3);
	pie.addSlice(s4);
	pie.addSlice(s5);

	pie.setRadius(90);
	pie.setStartAngleDegree(30);

	var tx = new JenScript.TranslatePlugin();
	linear.registerPlugin(tx);
	tx.select();

	var box = new JenScript.ZoomBoxPlugin();
	linear2.registerPlugin(box);
	box.select();
}
