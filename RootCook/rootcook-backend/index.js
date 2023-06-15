const express = require('express');
const pool = require('./database');
const app = express();
const PORT = 8080;


// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/recipe', (req, res) => {
  pool.query(`SELECT * FROM recipe`, (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/login', () => {

});


app.listen(PORT, () => {
  console.log(`App listening on Port: ${PORT}`);
});
