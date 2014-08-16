/**
 * New node file
 */


app = require('../app');

exports.index = function(req, res){
	var body = "<html>\n"+
    "<head>\n"+
     "\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n"+
     "\t<title>Welcome to the nodejs tutorial</title>\n"+
     "</head>\n"+
     "<body>\n"+
     "\t<form action=\"/upload\" method=\"post\" enctype=\"multipart/form-data\">\n" +
     "\t\t<input type=\"file\" name=\"upload\" />\n" +
     "\t\t<input type=\"submit\" value=\"Upload File\" />\n" +
     "\t</form>\n"+
     "</body>\n"+
     "</html>\n";

     console.log( "Request for 'start' is called." );
     
     res.writeHead( 200, { "Content-Type" : "text/html" } );
     res.end( body );

};

