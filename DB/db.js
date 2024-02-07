//install the mysql12 package
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306', // Default port for MySQL is 3306
    user: 'root',
    password: 'john4int',
    database: 'ABCKeeb'
});

// Open the connection
connection.connect(function (error) {
    if (error) {
        console.error("Error connecting to the database:", error.message);
    } else {
        console.log("Connected to the DB");
    }
});
