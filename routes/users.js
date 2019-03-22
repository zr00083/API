//import express and express router
const express = require('express');
const router = express.Router();
//import the database models.
const db = require('../models');

//import bcrypt and jsonwebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//ROUTES BEGIN HERE
////////////////////////////////////////////////////

//Register user route
router.post('/', (req,res) => {
  console.log(req.body);
  //Try and hash the password
  bcrypt.hash(req.body.password, 10)
    //if able to hash password
    .then((hash) => {
      //make a new user object
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hash,
      }
      //try and create the user in the database
      db.User.create(newUser)
        //if able to create user
        .then((createdUser) => {
          //send response with created user object
          res.status(201).json({created:createdUser});
        })
        //if unable to create user
        .catch((err) => {
          //send response with error information
          res.status(500).json({error: err});
        });
    });
});

//Login user route
router.post('/login', (req,res) => {
    res.status(200).json({route:"login"});
});

//Get user route
router.get('/:id', (req,res) => {
  db.User.findAll({where:{id:req.params.id}})
    .then((users) => {
      if(users.length > 0){
        res.status(200).json({route:"get user by id"});
      }else{
        res.status(404).json({error:"no users!"});
      }
    })

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

//ROUTES END HERE
////////////////////////////////////////////////////

module.exports = router;
