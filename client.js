const { Client } = require("pg");

const pgclient = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: "postgres",
  password: "Tiadavino3",
  database: "mytest",
});

pgclient.connect();

const table =
  "CREATE TABLE author(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))";
const text =
  "INSERT INTO author(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *";
const values = ["Japheth", "Kosgei", 32, "Nairobi, Kenya", "japheth@kdm.ke"];

pgclient.query(table, (err, res) => {
  if (err) throw err;
});

pgclient.query(text, values, (err, res) => {
  if (err) throw err;
});

pgclient.query("SELECT * FROM author", (err, res) => {
  if (err) throw err;
  console.log(err, res.rows); // Print the data in author table
  pgclient.end();
});
