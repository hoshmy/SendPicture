var fs = require('fs');
var configuration = require('./configuration');

module.exports = {
	initFileSystem : function(){
		if (false === fs.existsSync('.' + configuration.targetImagesDirectory)) 
		{
			fs.mkdirSync('.' + configuration.targetImagesDirectory);
		}
	}

}