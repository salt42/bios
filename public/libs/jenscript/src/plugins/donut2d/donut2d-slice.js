(function(){

	/**
	 * Object Donut2DSlice()
	 * Defines Donut2D Slice
	 * @param {Object} config
	 * @param {Object} [config.name] donut slice name
	 * @param {Object} [config.value] value that will be ratio normalize
	 * @param {Object} [config.themeColor] slice theme color, randomized if undefined
	 * @param {Object} [config.divergence] slice divergence in pixel
	 * 
	 */
	JenScript.Donut2DSlice = function(config){
		this.init(config);
	};
	JenScript.Model.addMethods(JenScript.Donut2DSlice,{
		
		/**
		 * Initialize Donut2D Slice
		 * @param {Object} config
		 * @param {Object} [config.name] donut slice name
		 * @param {Object} [config.value] value that will be ratio normalize
		 * @param {Object} [config.themeColor] slice theme color, randomized if undefined
		 * @param {Object} [config.divergence] slice divergence in pixel
		 * 
		 */
		init:function(config){
			config = config || {};
			/** slice name */
		    this.name = (config.name !== undefined)?config.name : 'Donut2DSlice name undefined';
		    /** slice value */
		    this.value = (config.value !== undefined)?config.value : 1 ;
		    /** slice theme color */
		    this.themeColor=(config.themeColor !== undefined)?config.themeColor : JenScript.createColor() ;
		    /** divergence */
		    this.divergence = (config.divergence !== undefined)?config.divergence : 0 ;
		    /**slice fill opacity*/
		    this.fillOpacity=(config.fillOpacity !== undefined)?config.fillOpacity : 1 ;
		    /**slice stroke opacity*/
		    this.strokeOpacity=(config.strokeOpacity !== undefined)?config.strokeOpacity : 1 ;
		    /** slice normalized value */
		    this.ratio;
		    /** start angle degree */
		    this.startAngleDegree;
		    /** end angle degree */
		    this.endAngleDegree;
		    /** slice path */
		    this.face;
		    /** slice outer arc */
		    this.outerArc;
		    /** slice inner arc */
		    this.innerArc;
		    /** lock roll over */
		    this.lockRollover = false;
		    /** slice draw */
		    this.stroke;
		    /** slice fill */
		    this.fill;
		    /** slice label */
		    this.sliceLabel;
		    /** host donut2D of this slice */
		    this.donut;
		    
		    if(this.value <= 0 )
		    	throw new Error('Slice value should be greater than 0');
		   
		},
		
		repaint : function(){
			if(this.donut !== undefined)
			this.donut.repaint();
		},
		

		/**
		 * set slice theme color
		 * @param {String} slice theme color
		 */
		setThemeColor : function(color){
			this.color=color;
			this.repaint();
		},
		
		/**
		 * get slice theme color
		 * @return {String} slice theme color
		 */
		getThemeColor : function(){
			return this.themeColor;
		},
		/**
		 * set slice divergence
		 * @param {Number} slice divergence
		 */
		setDivergence : function(divergence){
			this.divergence=divergence;
			this.repaint();
		},
		
		/**
		 * get slice divergence
		 * @return {Number} slice divergence
		 */
		getDivergence : function(){
			return this.divergence;
		},
		
		/**
		 * set slice fill opacity
		 * @param {Number} slice opacity
		 */
		setFillOpacity : function(opacity){
			this.fillOpacity=opacity;
			this.repaint();
		},
		
		/**
		 * get slice fill opacity
		 * @return {Number} slice opacity
		 */
		getFillOpacity : function(){
			return this.fillOpacity;
		},
		
		/**
		 * set slice stroke opacity
		 * @param {Number} slice opacity
		 */
		setStrokeOpacity : function(opacity){
			this.strokeOpacity=opacity;
			this.repaint();
		},
		
		/**
		 * get slice stroke opacity
		 * @return {Number} slice stroke opacity
		 */
		getStrokeOpacity : function(){
			return this.strokeOpacity;
		},
		
		setSliceLabel : function(sliceLabel) {
			if(sliceLabel !== undefined)
				sliceLabel.slice = this;
			this.sliceLabel = sliceLabel;
			this.repaint();
		},

		getSliceLabel : function() {
			return this.sliceLabel;
		},
		
		
		/**
		 * get ratio of this slice
		 * @returns {Number} the slice ratio
		 */
		getRatio : function(){
			return this.ratio;
		},
		
		/**
		 * set donut slice stroke
		 * @param {Object} stroke
		 */
		setStroke : function(stroke){
			this.stroke = stroke;
			this.repaint();
		},
		
		/**
		 * set donut slice fill
		 * @param {Object} fill
		 */
		setFill : function(fill){
			this.fill = fill;
			this.repaint();
		},
		
		/**
		 * set donut slice stroke
		 * @returns {Object} stroke
		 */
		getStroke : function(){
			return this.stroke;
		},
		
		/**
		 * set donut slice fill
		 * @returns {Object} fill
		 */
		getFill : function(){
			return this.fill;
		},
	});
})();