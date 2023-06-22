const pool = require('./database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
  const cookies = req.query.jwt;
  console.log("request query cookie pass", req.query.jwt)
  if (!cookies) return res.sendStatus(401);
  const refreshToken = cookies;

  pool.query('SELECT * FROM user WHERE REFRESH_TOKEN = ?', [refreshToken], (error, results) => {
    if (error) {
      console.error('Error executing query:', error.message);
      return res.sendStatus(500);
    }

    const foundUser = results[0];
    if (!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

        const accessToken = jwt.sign(
          { "username": decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '300s' }
        );
          if (accessToken) {
            res.json({ accessToken })
            console.log("ja", accessToken);
          } else {
            console.log("no", accessToken);
            res.json({ accessToken: null });
          }
      }
    );
  });
};

module.exports = { handleRefreshToken };
