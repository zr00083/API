const express = require('express');
const router = express.Router();

//Register user route
router.post('/', (req,res) => {
  res.status(200).json({route:"register"});
});

//Login user route
router.post('/login', (req,res) => {
  res.status(200).json({route:"login"});
});

//Get user route
router.get('/:id', (req,res) => {
  res.status(200).json({route:"get user by id"});
});

//Update user route
router.put('/:id', (req,res) => {
  res.status(200).json({route:"update"});
});

//Delete user route
router.delete('/:id', (req,res) => {
  res.status(200).json({route:"delete"});
});

//Search user route
router.get('/search/:username', (req,res) => {
  res.status(200).json({route:"search"});
});

module.exports = router;
