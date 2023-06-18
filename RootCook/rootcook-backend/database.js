const { createPool } = require('mysql');
const  pool  = createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "rootcook",
  connectionLimit: 10
})

module.exports = pool;
