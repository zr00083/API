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

//ROUTES BEGIN HERE
////////////////////////////////////////////////////

//Register user route
router.post('/', (req,res) => {
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
    })
    .catch((err) => {
        res.status(500).json({BCryptError: err});
    })
});

//Login user route
router.post('/login', (req,res) => {
  //get all the users from the database where the username is the same as the user trying to log in
  db.User.findAll({where:{username:req.body.username}})
    .then((users) => {
        //if the list of users return is not empty
        if(users.length > 0){
          //check the provided password against hashed password in database
          bcrypt.compare(req.body.password, users[0].password)
            .then((result) => {
              //if the password matched
              if(result){
                //generate a 4 week JWT which stores the user's ID and uses the SECRET_KEY env variable or dev to sign.
                const token = jwt.sign({id:users[0].id}, process.env.SECRET_KEY || 'dev', {expiresIn:'4 weeks'});
                //send respose with token in
                res.status(200).json({token:token});
              }else{ //if the password did not match
                //send incorrect password error
                res.status(401).json({error:"Incorrect Password"});
              }
            });
        }else{ //if the list of users returned is empty
          //send incorrect username error
          res.status(404).json({error:"Username not found"});
        }
    })
    .catch(() => {
        res.status(500).json({error: "DB error"});
    })
});

//Get user route
router.get('/:id', checkAuth, (req,res) => {
  //search for user in database where the id is the id provided
  db.User.findAll({where:{id:req.params.id}})
    .then((users) => {
      //if the list of users is not empty then
      if(users.length > 0){
        //return the user
        res.status(200).json({user:users[0]});
      }else{ //if list is empty
        //return user not found error
        res.status(404).json({error:"User not found"});
      }
    })
    .catch(() => {
        res.status(500).json({error: "DB error"});
    })
});

//Update user route
router.put('/:id', checkAuth, (req,res) => {
  //search for user in database where id is the id provided
  db.User.findAll({where:{id:req.params.id}})
    .then((users) => {
      //if the list of users is not empty then
      if(users.length > 0){
        //update the user
        users[0].update(req.body)
          .then((updatedUser) => { //if the user can be updated
            res.status(201).json({user:updatedUser}); //send the response with the updated user
          })
          .catch((err) => { //if the user can't be updated
            res.status(500).json({error:"Unable to update user"}); //send a response with the error message
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

//Delete user route
router.delete('/:id', checkAuth, (req,res) => {
  //search for user in database where id is the id provided
  db.User.findAll({where:{id:req.params.id}})
    .then((users) => {
      //if the list of users is not empty then
      if(users.length > 0){
        //try to delete user
        users[0].destroy()
          .then((deletedUser) => { //if the user can be deleted
            res.status(204).json({user:deletedUser}); //send response with deleted user
          })
          .catch(() => { //if the user can't be deleted
            res.status(500).json({error:"Unable to delete user"}); //send response with error message
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

//Search user route
router.get('/search/:username', checkAuth, (req,res) => {
  //search for user in database where username is like the username provided
  db.User.findAll({where:{username:{[Sequelize.Op.like]:`%`+req.params.username+`%`}}})
    .then((users) => {
      if(users.length > 0){ //if the users list is not empty
        res.status(200).json({users:users}); //send response with users array
      }else{ //if the users listis empty
        res.status(404).json({error:"Users not found"}); //send 404 error no users exist
      }
    })
    .catch(() => {
        res.status(500).json({error: "DB error"});
    })
});

//API route for server to check email for password reset
router.post('/resetpassword/:email', checkAuth, (req,res) => {
  //check if user exists
  // db.User.findAll({where:{email:req.params.email}})
  //   .then((users) => {
  //     //if user exists
  //     if(users.length > 0){
  //       //generate a jwt valid for 15 minutes
  //       const token = jwt.sign({id:users[0].id}, process.env.SECRET_KEY || 'dev', { expiresIn:'15m' });
  //       //send an email to user with link containing token
  //
  //
  //
  //     }else{ //if user doesn't exist
  //       res.status(404).json({error:"User not found"});//throw 404 error
  //     }
  //   });
});

//UI Route for user to reset password
router.get('/resetpassword/:token', checkAuth, (req,res) => {
  //attempt to verify token
    //if verifiable
      //render a reset password form
    //if not verifiable
      //display an error
  res.status(200).json({route:"resetpassword"});
});

router.post('/resetpassword/:token', checkAuth, (req,res) => {
  //attempt to verify token
    //if verifiable
      //reset user's password
    //if not verifiable
      //display an error
  res.status(200).json({route:"resetpassword"});
});



//ROUTES END HERE
////////////////////////////////////////////////////

module.exports = router;
