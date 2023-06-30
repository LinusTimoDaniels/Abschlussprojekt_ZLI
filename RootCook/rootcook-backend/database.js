const mysql = require('mysql');

const connection = mysql.createConnection({
  host: /* process.env.DB_HOST */ '127.0.0.1',
  user: /* process.env.DB_USER */ 'root',
  password: /* process.env.DB_PASSWORD */ '',
  database: /* process.env.DB_NAME */ 'rootcook',
   port: /*process.env.DB_PORT */ 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Rest of your backend code using the database connection

module.exports = connection;
