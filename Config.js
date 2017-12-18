var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "mysql7001.site4now.net",
    user: "a2fe2e_connect",
    password: "Loveyou123",
    database: "db_a2fe2e_connect"



//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "connectedapps"
});

function handleDisconnect() {

    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
        else{
            console.log("Database is connected");
        }
       
           

       
    });
}

connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
    } else {
        throw err;
    }

    
});



// connection.connect(function (err) {
//     if (!err) {
//         console.log("Database is connected");
//     } else {
//         console.log("Error while connecting with database");
//     }
// });
module.exports = connection;
