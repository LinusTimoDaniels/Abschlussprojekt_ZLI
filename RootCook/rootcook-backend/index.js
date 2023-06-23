const express = require('express');
const pool = require('./database');
const app = express();
const PORT = 8080;
const IP_ADDRESS = '127.0.0.1';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const Cookies = require("js-cookie");
const verifyJWT = require('./verifyJWT');
const cookieParser = require('cookie-parser');
const refreshTokenController = require('./refreshTokenController');
const logoutController = require('./logoutController');
const cors = require('cors');

app.use(cors());

//Middleware for cookies
app.use(cookieParser());

// Parse JSON request bodies
app.use(express.json());


// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Include 'Authorization' header
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



app.get('/refresh', refreshTokenController.handleRefreshToken);
app.get('/logout', logoutController.handleLogout);



app.get('/recipe', verifyJWT, (req, res) => {
  pool.query(`SELECT * FROM recipe WHERE published = 0`, (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});


app.post('/login', (req, res) => {
  const { username, email, password } = req.body;
  pool.query(
    'SELECT * FROM user WHERE email = ? AND username = ?',
    [email, username],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
          const user = results[0];
          bcrypt.compare(password, user.password, (bcryptError, bcryptResult) => {
            if (bcryptError) {
              console.error('Error comparing passwords:', bcryptError);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              if (bcryptResult) {
                const userData = {
                  id: user.id,
                  username: user.username,
                  email: user.email
                };
                const accessToken = jwt.sign(
                  {"username" : username},
                  process.env.ACCESS_TOKEN_SECRET,
                  {expiresIn: '300s'}
                );
                const refreshToken = jwt.sign(
                  {"username" : username},
                  process.env.REFRESH_TOKEN_SECRET,
                  {expiresIn: '1d'}
                );

                pool.query(
                  `UPDATE user SET ACCESS_TOKEN = ?, REFRESH_TOKEN = ? WHERE username = ? AND password = ?`,
                  [accessToken, refreshToken, user.username, user.password],
                  (updateError, updateResult) => {
                    if (updateError) {
                      console.error('Error updating tokens:', updateError.message);
                      return res.sendStatus(500);
                    }
                    console.log('Tokens updated in the database:', updateResult);
                    console.log(accessToken, refreshToken);
                    // Cookies.set('jwt', refreshToken)

                    // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
                    // console.log(res.cookie);
                    // console.log("Cookies", Cookies.get());
                    res.status(200).json({ data: userData, accessToken, refreshToken });
                  }
                );
              } else {
                res.status(400).json({ error: "Invalid password" });
              }
            }
          });
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      }
    }
  );
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


app.get('/user', verifyJWT, (req, res) => {
  const cookie = req.query.jwt;
  console.log(cookie);
  if (!cookie) return res.sendStatus(401);
  pool.query(`SELECT id, username FROM user WHERE REFRESH_TOKEN = ?`, [cookie], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});

app.get('/bookmarks', verifyJWT, (req, res) => {
  const UserId = req.query.user;
  console.log(UserId);
    pool.query(`SELECT r.* FROM Recipe AS r JOIN Bookmarks AS b ON r.id = b.Recipe_id WHERE b.User_id = ?`, [UserId], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.post('/bookmarks', verifyJWT, (req, res) => {
  const UserId = req.body.user;
  const RecipeId = req.body.recipe;
    pool.query(`INSERT INTO bookmarks (Recipe_id, User_id) VALUES ( ?, ?)`, [RecipeId, UserId], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});


app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running on ${IP_ADDRESS}:${PORT}`);
});
