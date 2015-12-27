var http = require('http');
var mongojs = require('mongojs');
var uri = 'mongodb://admin:admin@ds037165.mongolab.com:37165/showtracker_development';
var db = mongojs(uri, ["shows"]);

var requestHandler = function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	db.shows.find({"showName": "Breaking Bad"}, function(err, records) {
		if(err){
			console.log("There was an error executing the database query.");
   	 	response.end();
    	return;
		}
		var html = '<h2>Data from my MongoDB Database</h2>';
  	var i = records.length;

		while(i--) {
    	html += '<p><b>Show Name:</b> ' 
        	 + records[i].showName
        	 + ' <br /><b>Number of Seasons:</b> ' 
        	 + records[i].seasons 
       	   + '<br /><b>Episodes per Season: </b>' 
        	 + records[i].episodesPerSeason;
  	}
  	response.write(html);
  	response.end();
	}) 
}
var server = http.createServer(requestHandler);
server.listen(8000);