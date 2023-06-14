const { createPool } = require('mysql');
const  pool  = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "rootcook",
  connectionLimit: 10
})

module.exports = pool;
