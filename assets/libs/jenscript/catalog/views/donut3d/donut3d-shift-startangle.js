
/**
 * Create Donut3D shift start angle animation
 * 
 * @param container
 * @param width
 * @param height
 */
function createDonut3DShiftStartAngle(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		
	});
	
	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1000,
		maxX : 1000,
		minY : -1000,
		maxY : 1000
	});
	view.registerProjection(proj);


	var donut3DPlugin = new JenScript.Donut3DPlugin();
	proj.registerPlugin(donut3DPlugin);

	var donut = new JenScript.Donut3D();
	donut3DPlugin.addDonut(donut);

	donut.thickness = 20;
	donut.startAngleDegree = 240;

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

	donut.addSlice(s1);
	donut.addSlice(s2);
	donut.addSlice(s3);
	donut.addSlice(s4);
	donut.addSlice(s5);

	var tx = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx);
	tx.select();

	var zoomwheel = new JenScript.ZoomWheelPlugin();
	proj.registerPlugin(zoomwheel);
	

	
	
	// 2 times 360 in 2 seconds with 20 repaint frames
	setTimeout(function() {
		donut.shift(2 * 360, 2000, 20);
	}, 1000);
	setTimeout(function() {
		donut.shift(-140, 500, 8);
	}, 4000);

}