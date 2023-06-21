const express = require('express');
const pool = require('./database');
const app = express();
const PORT = 8080;
const IP_ADDRESS = '127.0.0.1';
const bcrypt = require('bcrypt');

// Parse JSON request bodies
app.use(express.json());

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





app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(`SELECT * FROM user WHERE email = ? AND password = ?`, [email, password]);
    if (user.length > 0) {
      res.json('LOGGED IN');
    } else {
      res.json(user)
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  pool.query(
    `SELECT * FROM user WHERE username = ? OR email = ?`,
    [username, email],
    (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (result.length > 0) {
          // User already exists
          res.status(400).json({ error: 'User already exists' });
        } else {
          // User does not exist, proceed with registration
          bcrypt.hash(password, 10).then((hash) => {
            pool.query(
              `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`,
              [username, email, hash],
              (error, result) => {
                if (error) {
                  console.error('Error executing query', error);
                  res.status(500).json({ error: 'Internal server error' });
                } else {
                  console.log('User registered:', result);
                  res.json("USER REGISTERED");
                }
              }
            );
          });
        }
      }
    }
  );
});



app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running on ${IP_ADDRESS}:${PORT}`);
});
