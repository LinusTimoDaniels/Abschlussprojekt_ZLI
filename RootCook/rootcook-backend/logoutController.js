const pool = require('./database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogout = (req, res) => {
  console.log("handleLogout");
  const cookies = req.headers.cookie;
  console.log(req.headers);
  if (!cookies?.jwt) {
    console.log("NOOOOOO    Content available");
    return res.sendStatus(204); // No content
  }
  console.log("Content available")
  const refreshToken = cookies.jwt;

  pool.query('SELECT * FROM user WHERE REFRESH_TOKEN = ?', [refreshToken], async (error, results) => {
    if (error) {
      console.error('Error executing query:', error.message);
      return res.sendStatus(500);
    }

    const foundUser = results[0];
    if (!foundUser) {
      console.log("User not found: Deleting cookie");
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(204);
    }

    // Update refreshToken in the database
    pool.query('UPDATE user SET REFRESH_TOKEN = ? WHERE id = ?', ['', foundUser.id], async (updateError) => {
      if (updateError) {
        console.error('Error updating refreshToken:', updateError.message);
        return res.sendStatus(500);
      }
      // console.log("refreshToken: Deleting cookie");
      // TODO : Cookies.remove('name')
      // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      res.sendStatus(204);
    });
  });
};

module.exports = { handleLogout };
