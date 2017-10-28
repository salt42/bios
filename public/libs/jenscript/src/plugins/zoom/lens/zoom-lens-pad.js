(function(){
	JenScript.LensPad = function(config) {
		this.___init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.LensPad, JenScript.AbstractPlusMinusPadWidget);
	JenScript.Model.addMethods(JenScript.LensPad,{
		___init: function(config){
			config = config || {};
			config.Id = 'lens_pad'+JenScript.sequenceId++;
			config.width=64;
			config.height=64;
			config.xIndex=60;
			config.yIndex=100;
			
			JenScript.AbstractPlusMinusPadWidget.call(this,config);
			
			 /** theme color to fill pad base */
		    this.baseFillColor = JenScript.RosePalette.COALBLACK;
		    /** theme color to draw pad base */
		    this.baseStrokeColor = JenScript.RosePalette.MELON;
		    /** stroke width to draw pad base */
		    this.baseStrokeWidth = 1;
		    /** theme color to fill pad control */
		   // this.controlFillColor = 'rgba(250,0,0,0.4)';
		    /** theme color to draw pad control */
		    this.controlStrokeColor = JenScript.RosePalette.AEGEANBLUE;
		    /** stroke width to draw pad control */
		    this.controlStrokeWidth =1;
		    /** button fill color */
		    this.buttonFillColor = JenScript.RosePalette.EMERALD;
		    /** button rollover fill color */
		    this.buttonRolloverFillColor = JenScript.RosePalette.MELON;
		    /** button stroke color */
		    this.buttonStrokeColor =  JenScript.RosePalette.FOXGLOWE;
		    /** button rollover stroke color */
		    this.buttonRolloverStrokeColor =JenScript.RosePalette.MELON;
		    /** button stroke */
		    this.buttonStrokeWidth =1;
		},
		
		
	    onNorthButtonPress : function() {
	        if (!this.getHost().isLockSelected()) {
	            return;
	        }
	        this.getHost().startZoomIn('ZoomY');
	    },
	  
	    onSouthButtonPress : function() {
	        if (!this.getHost().isLockSelected()) {
	            return;
	        }
	        this.getHost().startZoomOut('ZoomY');
	    },

	    onWestButtonPress : function() {
	        if (!this.getHost().isLockSelected()) {
	            return;
	        }
	        this.getHost().startZoomOut('ZoomX');
	    },

	    onEastButtonPress : function() {
	        if (!this.getHost().isLockSelected()) {
	            return;
	        }
	        this.getHost().startZoomIn('ZoomX');
	    },
	    
	    onRegister : function(){
	    	this.attachPluginLockUnlockFactory('Lens Pad widget factory');
	    }
	});
})();