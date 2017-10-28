(function(){
	JenScript.StockPlugin = function(config) {
		this._init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.StockPlugin, JenScript.Plugin);

	JenScript.Model.addMethods(JenScript.StockPlugin, {
		_init : function(config){
			config = config || {};
			this.stocks = [];
			this.stockLayers=[];
			config.priority = 10000;
			config.name = (config.name !== undefined)?config.name:'StockPlugin';
			JenScript.Plugin.call(this,config);
			this.bearishColor = (config.bearishColor !== undefined)?config.bearishColor:'red';
			this.bullishColor = (config.bullishColor !== undefined)?config.bullishColor:'green';
		},
		
		getBearishColor :function() {
			return this.bearishColor;
		},

		setBearishColor :function(bearishColor) {
			this.bearishColor = bearishColor;
		},

		getBullishColor :function() {
			return this.bullishColor;
		},

		setBullishColor :function(bullishColor) {
			this.bullishColor = bullishColor;
		},
		
		/**
		 * get all stocks
		 * @returns stocks
		 */
		getStocks : function(){
			return this.stocks;
		},
		
		/**
		 * get stocks bounded in projection more previous and next points
		 * @returns stocks in current projection date range
		 */
		getBoundedStocks : function(){
			//console.log('get bounded stock');
			var boundedStocks = [];
			for (var i = 0; i < this.stocks.length; i++) {
				var s = this.stocks[i];
				var sp = this.stocks[i-1];
				var sn = this.stocks[i+1];
				if(s.fixing.getTime()>=this.getProjection().minX && s.fixing.getTime()<=this.getProjection().maxX){
					if(sp !== undefined && sp.fixing.getTime()<this.getProjection().minX){
						boundedStocks[boundedStocks.length] = sp;
					}
					boundedStocks[boundedStocks.length] = s;
					if(sn !== undefined && sn.fixing.getTime()>this.getProjection().maxX){
						boundedStocks[boundedStocks.length] = sn;
					}
				}
				
			}
			return boundedStocks;
		},
		
		/**
		 * get stocks bounded in given min and max date
		 * @returns stocks in given date range
		 */
		getRangeStocks : function(minDate,maxDate){
			//console.log('get bounded stock');
			var boundedStocks = [];
			for (var i = 0; i < this.stocks.length; i++) {
				var s = this.stocks[i];
				if(s.fixing.getTime()>=minDate.getTime() && s.fixing.getTime()<=maxDate.getTime()){
					boundedStocks[boundedStocks.length] = s;
				}
				
			}
			return boundedStocks;
		},
		
		
		/**
		 * get all layers of stock plugin
		 * @returns layers
		 */
		getLayers : function(){
			return this.stockLayers;
		},
		
		/**
		 * add the given layer to stock plugin
		 * @param {Object} layer
		 */
		addLayer : function(layer){
			layer.plugin=this;
			this.stockLayers[this.stockLayers.length]=layer;
			this.repaintPlugin();
		},
		
		/**
		 * remove given layers 
		 * @param {Object} layer
		 */
		removeLayer : function(layer){
			var layers = [];
			for (var i = 0; i < this.stockLayers.length; i++) {
				var l = this.stockLayers[i];
				if(l.Id !== layer.Id)
					layers = l;
			}
			this.stockLayers = layers;
			this.repaintPlugin();
		},
		
		/**
		 * remove all layers
		 */
		removeAllLayer : function(){
			this.stockLayers = [];
			this.repaintPlugin();
		},
		
		/**
		 * set stocks
		 * @param {Array} stock array
		 */
		setStocks : function(stocks){
			this.stocks=stocks;
			stocks.sort(function(s1, s2) {
				var f1 = s1.fixing.getTime();
				var f2 = s2.fixing.getTime();
				if (f1 > f2)
					return 1;
				else
					return -1;
			});
			this.repaintPlugin();
		},
		
		/**
		 * add given stock
		 * @param {Object} stock
		 */
		addStock : function(stock){
			this.stocks[this.stocks.length]=stock;
			this.setStocks(this.stocks);
		},
		
		
		/**
		 * paint this stock plugin
		 * @param {Object} g2d
		 * @param {Object} part
		 */
		paintPlugin : function(g2d, part) {
			if(part === 'Device'){
				for (var i = 0; i < this.stockLayers.length; i++) {
					var l = this.stockLayers[i];
					l.solveLayer();
					l.paintLayer(g2d,part);
				}
			}
		},
		
		/**
		 * on projection register, add projection bound listener to repaint this plugin
		 */
		onProjectionRegister : function(){
			var that = this;
			this.getProjection().addProjectionListener('boundChanged', function(){
				that.repaintPlugin();
			},'Stock plugin listener for projection bound changed');
		},
		
		
		
		onPress : function(evt,part,x, y) {
			//mozilla, prevent Default to enable dragging correctly
			if(evt.preventDefault){
				evt.preventDefault();
			}
					
			if(this.isTranslateAuthorized(evt,part,x,y)){
				//console.log('Translate authorize to start : '+this.Id+" proj "+this.getProjection().name);
				this.startTranslate(new JenScript.Point2D(x,y));
			}else{
				//console.log('Translate NOT authorize to start : '+this.Id);
			}
		},
		
		onMove : function(evt,part,x, y) {
			for (var i = 0; i < this.stockLayers.length; i++) {
				var l = this.stockLayers[i];
				l.onMove(evt,part,x, y);
			}
		},

		onPress : function(evt,part,x, y) {
			for (var i = 0; i < this.stockLayers.length; i++) {
				var l = this.stockLayers[i];
				l.onPress(evt,part,x, y);
			}
		},

		onRelease : function(evt,part,x, y) {
			for (var i = 0; i < this.stockLayers.length; i++) {
				var l = this.stockLayers[i];
				l.onRelease(evt,part,x, y);
			}
		},
		
		
	});
})();