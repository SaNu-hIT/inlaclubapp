var mysql = require('mysql');
var pool  = mysql.createPool({
  host: "mysql5011.site4now.net",
      user: "a16b8c_connect",
      password: "connected7273",
      database: "db_a2fe2e_connect"

    //   host: "localhost",
    // user: "root",
    // password: "",
    // database: "connectedapp"

});

pool.getConnection(function(err, connection) {
        if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
      
        // setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }  
      else{


        console.log('Connect to db');
      }         
});

module.exports = pool;

