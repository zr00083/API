//import express and express router
const express = require('express');
const router = express.Router();
//import the database models.
const db = require('../models');
const Sequelize = require('sequelize');

//import bcrypt and jsonwebtoken and nodemailer
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../lib/mailer');

//import useful middleware
const checkAuth = require('../middleware/check-auth');
const checkUserMatch = require('../middleware/check-matching-user');

//ROUTES BEGIN HERE
////////////////////////////////////////////////////


//get list of all users who have friended the user with the id.
router.get('/friends/:id/followers', checkAuth, (req, res) => {
  //search for user in database where the id is the id in the JWT
  db.User.findAll({where:{id:req.userData.id}})
    .then((users) => {
      //if the list of users is not empty then
      if(users.length > 0){
        //search for friends in database where id is the id in JWT
        db.Friends.findAll({where:{id:req.followers.id}})
        .then((friends) => {
          //if the list of friends is not empty then
          if(friends.length > 0){
            //return the followers.
            res.status(200).json(friends[0]);
          }else{ //if list is empty
            //return unable to retrieve followers
            res.status(404).json({error:"Unable to retreive followers"});
          }
        })
      }else{ //if list is empty
        //return user not found error
        res.status(404).json({error:"User not found"});
      }
    })
    .catch(() => {
        res.status(500).json({error: "DB error"});
    })
});

//gets the list of all users who the user has friended.
router.get('/friends/:id/following', checkAuth, (req, res) => {

});

//sender of this request will friend the user with id.
router.post('/friends/:id/friend', (req, res) => {

});

//sender of this request will unfriend the user with id.
router.delete('/friends/:id/friend', (req, res) => {

});

//sender of this request will block the user with id.
router.post('/friends/:id/block', (req, res) => {

});

//sender of this request will unblock the user with id.
router.delete('/friends/:id/block', (req, res) => {

});
