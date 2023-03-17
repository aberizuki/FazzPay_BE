const { Client } = require("pg");
require("dotenv").config();

const { USER, HOST, DATABASE, PASSWORD, PORT } = process.env;

const db = new Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});

db.connect((err) => {
  if (!err) {
    console.log("Database Connected");
  } else {
    console.log("Database Connection Failed", err);
  }
});

module.exports = db;
