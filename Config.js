var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: "mysql7001.site4now.net",
  user: "a2fe2e_connect",
  password: "Loveyou123",
  database: "db_a2fe2e_connect"
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;
