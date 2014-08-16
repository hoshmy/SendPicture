var serverVersion = '0.0.1';
var lastUpdateDate = "10.08.2014";

var app = require('../app');
app.enable('trust proxy');
var fs = require('fs');
var configuration = require('./configuration');
var utilities = require('./utilities');


/**maintain storage*/
var storage = module.exports = require('node-persist');
storage.initSync();

var imageCounter = 1;
var keyLastSavedImageCount = 'ZZZZ';

var storage = require('node-persist');
storage.initSync();
var imageCounter = storage.getItem(keyLastSavedImageCount);
if(imageCounter == undefined)
{
	imageCounter = 1;
	storage.setItem(keyLastSavedImageCount,imageCounter);
	console.log('Image Counter was inserted to storage as 1');
}
else
{
	console.log('Good Image Counter was read from storage: ' + imageCounter.toString());
}
/**storage*****/




app.get('/a',function(req,res,next){
	res.write('Zalupa Balshoya');
	res.end();
});

app .get('/deleteAllImages', function(req,res,next){
	utilities.deleteAllImages();
	imageCounter = 1;
	storage.setItem(keyLastSavedImageCount,imageCounter);	
	res.write('All files were deleted!');
	res.end();
});


try{
app.post('/upload', function(req, res, next) {
	console.log('Received starting');
	console.log('JSON:' + JSON.stringify(req.files));
    console.log('body: ' + req.body);
    console.log('files: ' + req.files);
    
 // get the temporary location of the file
    var tmp_path = req.files.upload.path;
    
    // set where the file should actually exists - in this case it is in the "images" directory
//    var target_path = './public/saved/' + req.files.upload.name;
//    var target_path = './public/images/' + imageCounter.toString() + '.jpg';
    var target_path = '.' + configuration.targetImagesDirectory + imageCounter.toString() + '.jpg';
    console.log('configuration.targetImagesDirectory: ' + configuration.targetImagesDirectory);
    console.log('Target Path' + target_path);
    ++imageCounter;
    storage.setItem(keyLastSavedImageCount,imageCounter);
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err)
        {
        	//throw err;
        	console.log(err);
        }
        else
        {
        	var savedImageIndex = imageCounter-1;
        	var redirectTo = 'http://' + req.headers.host + configuration.targetImagesDirectory + savedImageIndex.toString() + '.jpg';
//        	req.headers.host
        	console.log('redirect to: ' + redirectTo);
        	res.writeHead(301,
        			  {Location: redirectTo}
			);
			res.end();
	
//        	res.send('File uploaded to: ' + target_path + ' - ' + req.files.upload.size + ' bytes');
//        	console.log('pic saved to: '+ target_path);
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
//        	fs.unlink(tmp_path, function() {
//	        	if (err){
//	        	//throw err;
//	        	console.log(err);
//	        	}
//	        	else
//	        	{
//	        		res.send('File uploaded to: ' + target_path + ' - ' + req.files.upload.size + ' bytes');
////	        		res.end();
//	        	}	
//        	});
        }
            
    });
});
}catch(err)
{
	console.log(err);
}