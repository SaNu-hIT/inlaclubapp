// var mysql = require('mysql');
// var connection = mysql.createConnection({
// //     host: "mysql7001.site4now.net",
// //     user: "a2fe2e_connect",
// //     password: "Loveyou123",
// //     database: "db_a2fe2e_connect",
// //      options: {
// //       encrypt: true
// //     }
    
//  host: "mysql.hostinger.in",
//     user: "u711181266_club",
//     password: "y4Id8zJoa7neeHw",
//     database: "u711181266_club",
//      options: {
//       encrypt: true
//     }


// //     host: "localhost",
// //     user: "root",
// //     password: "",
// //     database: "connectedapps"
// });

// function handleDisconnect() {

//     connection.connect(function (err) {
//         if (err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000);
//         }
//         else{
//             console.log("Database is connected");
//         }
       
           

       
//     });
// }

// connection.on('error', function (err) {
//     console.log('db error', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         handleDisconnect();
//     } else {
//         throw err;
//     }

    
// });



// connection.connect(function (err) {
//     if (!err) {
//         console.log("Database is connected");
//     } else {
//         console.log("Error while connecting with database");
//     }
// });
// module.exports = connection;



var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: "mysql7001.site4now.net",
//     user: "a2fe2e_connect",
//     password: "Loveyou123",
//     database: "db_a2fe2e_connect"

//     // host: "mysql.hostinger.in",
//     // user: "u711181266_club",
//     // password: "cloudique123*",
//     // database: "u711181266_club"



//     // host: "localhost",
//     // user: "root",
//     // password: "",
//     // database: "connectedapps"
// });

// connection.connect(function (err) {
//     if (!err) {
//         console.log("Database is connected");
//     } else {
//         console.log("Error while connecting with database");
//     }
// });


// function handleDisconnect() {

//     connection.connect(function (err) {
//         // if (err) {
//         //     console.log('error when connecting to db:', err);
//         //     setTimeout(handleDisconnect, 2000);
//         // }
//         // else{
//         //     console.log("Database is connected");
//         // }

//         if(!err.fatal)
//         return;
//         if(err.code !== 'PROTOCOL_CONNECTION_LOST')
//         throw err;

//     log.info("Attempting to re-connect with SQL.");
//     setTimeout(handleDisconnect, 2000);
           

       
//     });
// }

// connection.on('error', function (err) {
//     console.log('db error', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         handleDisconnect();
//     } else {
//         throw err;
//     }

    
// });





// // connection.end();


// module.exports = connection;


var db_config = {
     host: "mysql7001.site4now.net",
    user: "a2fe2e_connect",
    password: "Loveyou123",
    database: "db_a2fe2e_connect"
  };
  
  var connection;
  
  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
          connection.end();
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }  
      else{

        console.log('Connect to db');
      }                                   // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();

  module.exports = connection;
