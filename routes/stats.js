//import express and express router
const express = require('express');
const router = express.Router();
//import the database models.
const db = require('../models');

//import useful middleware
const checkAuth = require('../middleware/check-auth');
const checkUserMatch = require('../middleware/check-matching-user');

//ROUTES BEGIN HERE
////////////////////////////////////////////////////

router.get('/:id/fugitive', checkAuth, (req, res) => {
  res.send('here');
});

router.get('/:id/bountyhunter', checkAuth, (req, res) => {
  res.send('here');
});

router.post('/:id/fugitive', checkAuth, (req, res) => {
  res.send('here');
});

router.post('/:id/bountyhunter', checkAuth, (req, res) => {
  res.send('here');
});


//ROUTES END HERE
////////////////////////////////////////////////////

module.exports = router;
