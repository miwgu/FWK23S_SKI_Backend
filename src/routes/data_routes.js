const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secretKey = process.env.SECRET_KEY;
console.log('SecretKey:', secretKey);

// Funktion för att extrahera token från förfrågningshuvudet
function extractToken(req) {
  const authHeader = req.headers['authorization'];
  return authHeader && authHeader.split(' ')[1];
}

// Funktion för att verifiera och dekodera token
function verifyAndDecodeToken(token) {
  return jwt.verify(token, secretKey);
}

// Route-hanterare
router.get('/', (req, res) => {
  const token = extractToken(req);
  console.log('Token:', token);

  if (!token) {
    return res.status(401).send('Access Denied: No token provided');
  }

  try {
    const decoded_verified = verifyAndDecodeToken(token);
    console.log('Decoded JWT Payload:', decoded_verified);
    console.log('User Role:', decoded_verified.role);

    if (decoded_verified.role === 'admin') {
      console.log('Admin access granted');
      res.status(200).json({ data: 'Secret data for admin!' });
    } else {
      console.log(`${decoded_verified.role} access denied, you are not admin`);
      res.status(200).json({ message: 'Logged in successfully, but denied data access' });
    }
  } catch (error) {
    console.log(`Token Error: ${error.message}`);
    res.status(401).send(`Invalid Token: ${error.message}`);
  }
});

module.exports = router;
