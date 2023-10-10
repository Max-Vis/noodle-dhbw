var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1:3306",
  user: "root",
  password: "root",
  database: "noodle_dhbw"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});