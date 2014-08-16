var fs = require('fs');
var configuration = require('./configuration');

module.exports = {
	initFileSystem : function(){
		if (false === fs.existsSync('.' + configuration.targetImagesDirectory)) 
		{
			fs.mkdirSync('.' + configuration.targetImagesDirectory);
		}
	},

	deleteAllImages :function(){
		var directory = '.' + configuration.targetImagesDirectory;
		fs.readdirSync(directory).forEach(function(fileName) {
			var file = directory + fileName;
	        console.log('deleting:' + file);
            fs.unlinkSync(file);
	    });
	}

}