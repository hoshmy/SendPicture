var app = require('../app');
var fs = require('fs');
var path = require("path")
var configuration = require('./configuration');
var utilities = require('./utilities');


var filesDeletionQueue = [];
try{
app.get('/download', function(req, res){
	
	var directory = path.join(__dirname, '\..\\',configuration.targetImagesDirectory);
	fs.readdir(directory,function(err, files){
		if(err)
		{
			console.log('Error occured while reading dir:\n' + err);
			res.writeHead(200, {'Content-Type': 'text/plain' });
		    res.end('Error reading directory' + err + '\n');
		}
		else
		{
			var fileIndex = 0;
			for(fileIndex=0; fileIndex<files.length;++fileIndex)
			{
				if(-1 == filesDeletionQueue.indexOf(files[fileIndex]))
				{
					var file = directory + files[fileIndex];
					console.log('downloading file: ' + file);
					res.download(file,files[fileIndex]);
					filesDeletionQueue.push(files[fileIndex]);
					isAnyFileDownloaded = true;
					break;
				}
			}
			
			if(fileIndex === files.length)
			{/*If no file was downloaded then the connection should be */
				res.writeHead(200, {'Content-Type': 'text/plain' });
			    res.end('No Files');
			}

		}
    });
});

app.post('/ackImageDownload',function(req,res,next){
	var fileForDeletion = req.body;
	console.log('Asking To Delete file ' + fileForDeletion);
	
	var isFileInDeletionQueue = filesDeletionQueue.indexOf(fileForDeletion);
	if(isFileInDeletionQueue >= 0)
	{/*the file exists - delete it*/
		var directory = path.join(__dirname, '\..\\',configuration.targetImagesDirectory);
		var file = directory + fileForDeletion;
		fs.unlink(file);
		filesDeletionQueue.splice(isFileInDeletionQueue,1);
		res.status(200);
		res.end('File ' + fileForDeletion + ' was deleted');
	}
	else
	{
		res.status(404);
		res.end();
	}
});

app.get('/resetDeleteQueue',function(req,res,next){
	filesDeletionQueue = [];
	res.status(200);
	res.end('Queue deleted');
});



}catch(err)
{
	console.log(err);
}