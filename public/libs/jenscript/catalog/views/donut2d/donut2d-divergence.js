
/**
 * Create Donut2D with slice divergence
 * @param container
 * @param width
 * @param height
 */
function createDonut2DDivergence(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		
	});

	var proj = new JenScript.IdentityProjection();
	view.registerProjection(proj);


	var donut2DPlugin = new JenScript.Donut2DPlugin();
	proj.registerPlugin(donut2DPlugin);

	var donut = new JenScript.Donut2D();
	donut2DPlugin.addDonut(donut);

	donut.setFill(new JenScript.Donut2DRadialFill());

	var s1 = new JenScript.Donut2DSlice({
		name : "s1",
		value : 1,
		themeColor : 'rgba(240, 240, 240, 0.9)'
	});
	var s2 = new JenScript.Donut2DSlice({
		name : "s2",
		value : 1,
		themeColor : 'rgba(37,38,41,1)'
	});
	var s3 = new JenScript.Donut2DSlice({
		name : "s3",
		value : 1,
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new JenScript.Donut2DSlice({
		name : "s4",
		value : 1,
		themeColor : 'rgba(22,125,218, 1)'
	});
	var s5 = new JenScript.Donut2DSlice({
		name : "s5",
		value : 1,
		themeColor : 'rgba(61,44,105,1)'
	});

	s1.divergence = 0;
	s2.divergence = 30;
	s3.divergence = 0;
	s4.divergence = 30;
	s5.divergence = 0;

	donut.addSlice(s1);
	donut.addSlice(s2);
	donut.addSlice(s3);
	donut.addSlice(s4);
	donut.addSlice(s5);


	donut2DPlugin.repaintPlugin();

}