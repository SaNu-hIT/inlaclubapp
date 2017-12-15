var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var con = mysql.createConnection({
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
 });
function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}


http.createServer(onRequest).listen(8080);

