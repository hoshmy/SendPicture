
/**
 * Module dependencies.
 */


var express = require('express');
var routes = require('./routes');
var utilities = require('./routes/utilities');
var configuration = require('./routes/configuration');
var http = require('http');
var path = require('path');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.bodyParser());
app.use(express.multipart({ keepExtensions: true, uploadDir: __dirname + configuration.targetImagesDirectory }));
//app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + configuration.targetImagesDirectory }));
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
app.use(configuration.targetImagesDirectory, express.static(__dirname + configuration.targetImagesDirectory));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}


utilities.initFileSystem();

app.get('/', routes.index);
require('./routes/uploading');
require('./routes/download');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
