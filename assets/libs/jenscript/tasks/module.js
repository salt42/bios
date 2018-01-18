module.exports = function(grunt) {
	grunt.registerTask('module', 'package plugin', function(featuresArgs) {
		  grunt.log.writeln('jenscript@'+grunt.config('pkg').version);
		  grunt.log.writeln('jenscript@module task argument : '+featuresArgs);
		  var  _features =  grunt.config('jenscript.features');
		  var features = [];
		  var targetFeature;
		  for (var k = 0; k < _features.length; k++) {
			  var _feature = _features[k];
			  if(_feature.name === featuresArgs ){
				  targetFeature = _feature;
				  grunt.log.writeln("jenscript@"+_feature.name);
				  for (var j = 0; j < _feature.parts.length; j++) {
					  grunt.log.writeln('├──'+_feature.name+"@"+_feature.parts[j].substring(_feature.parts[j].lastIndexOf('/')+1));
				  }
				  features = features.concat(_feature.parts);
			  }
		 }
		  grunt.config('libname','build/plugins/jenscript-'+targetFeature.name+'.js');
		  grunt.config('minName','build/plugins/jenscript-'+targetFeature.name+'.min.js');
		  grunt.config('features',targetFeature.parts);
		  grunt.task.run(["concat","replace", "uglify"]);
	});
};