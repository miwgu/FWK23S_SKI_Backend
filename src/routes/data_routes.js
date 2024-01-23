const express = require('express');
const jwt = require('jsonwebtoken');

// Skapar en router för att hantera data routes och exportera den från modulen för att kunna använda den i server.js
const router = express.Router();
// Hämtar secret key från .env filen och skriver ut den i konsolen för att verifiera att den är korrekt satt
const secretKey = process.env.SECRET_KEY;
console.log('SecretKey:', secretKey);

// skapar en funktion för att extrahera token från request headers och returnerar den som en sträng eller null om den inte finns
function extractToken(req) {
  const authHeader = req.headers['authorization']; 
  return authHeader && authHeader.split(' ')[1];
}

// Funktion för att verifiera och dekodera token med hjälp av jwt.verify() funktionen och returnerar den verifierade och dekodade token
function verifyAndDecodeToken(token) {
  return jwt.verify(token, secretKey);
}

// Route-hanterare som hämtar token från request headers och verifierar och dekodar den med hjälp av verifyAndDecodeToken() funktionen
router.get('/', (req, res) => {
  const token = extractToken(req);
  console.log('Token:', token);
// Om token inte finns skickas ett felmeddelande tillbaka
  if (!token) {
    return res.status(401).send('Access Denied: No token provided');
  }
// Om token finns verifieras och dekodas den med verifyAndDecodeToken() funktionen och skickas tillbaka som JSON
  try {
    const decoded_verified = verifyAndDecodeToken(token);
    console.log('Decoded JWT Payload:', decoded_verified);
    console.log('User Role:', decoded_verified.role);
// Om det är en admin som försöker komma åt data skickas datan tillbaka som JSON
    if (decoded_verified.role === 'admin') {
      console.log('Admin access granted');
      res.status(200).json({ data: 'Secret data for admin!' });

// Om det är en användare som försöker komma åt data skickas ett felmeddelande tillbaka
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
