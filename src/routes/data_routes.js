const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Use .env This file should not upload to github(.gitignore) This .env file is a secret file in our group5
const secretKey = process.env.SECRET_KEY;
console.log('SecretKey:', secretKey);

router.get('/',(req,res) =>{
  const authHeader = req.headers['authorization'];
  
  /*"authHeader &&"" checks that authHeader is truthy or falsy. Falsy means null, undefined, or an empty string.
  Split operation, authHeader.split(' ')[1] requires a valid string input.  If  authHeader has null or undefined, it will result in a runtime error.
  */ 
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);
  
  if(!token) return res.status(401).send('Access Denied');
  
  try{
    const decoded_verified = jwt.verify(token, secretKey);
    console.log('Decoded JWT Payload:', decoded_verified);
    console.log('User Role:', decoded_verified.role);
    if(decoded_verified.role ==='admin'){
      console.log('You are an Admin! You can access.');
      //res.json({data: 'Secret data for admin!'});
      res.status(200).json({data: 'Secret data for admin!'})
    
    }else{
      console.log('You are not Admin You cannot Access!');// You can see this in git Bash
      //res.json({data: 'Secret data for user!'});
      res.status(403).send("You are not an Admin! Access denied.")// If User is not "Admin", Send status 403 Because this data is for Admin 
    }
   }catch (error) {
      res.status(401).send(`Invalid Token: ${error.message}`);
   }
  });
  
  module.exports = router;