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
  //get all the stats from the fugitive stats table where uid is the users id
  db.FugitiveStat.findAll({where: {uid: req.params.id }})
    .then((stats) => {
      res.status(200).json({stats:stats}); //send the stats in the response
    });
});

router.get('/:id/bountyhunter', checkAuth, (req, res) => {
  //get all the stats from the fugitive stats table where uid is the users id
  db.BountyHunterStat.findAll({where: {uid: req.params.id }})
    .then((stats) => {
      res.status(200).json({stats:stats}); //send the stats in the response
    });
});

router.post('/:id/fugitive', checkAuth, checkUserMatch, (req, res) => {
  db.User.findAll({where: {id: req.params.id}})
    .then((users) => {
      if(users.length > 0){ //if the user exists
        const stat = {
          gid: req.body.gid,
          uid: users[0].id,
          points: req.body.points,
          challengesComplete: req.body.challengesComplete,
          challengesFailed: req.body.challengesFailed,
          won: req.body.won
        }
        //try and create the stat
        db.FugitiveStat.create(stat)
          .then((stat) => {
            //send a success response
            res.status(200).json({message:"Stat created"});
          })
          .catch(() => {
            res.status(500).json({message:"Unable to create stat"});
          });
      }else{ //if the user doesn't exist
        res.status(404).json({error:"User not found!"}); //send a 404 response
      }
    })
});

router.post('/:id/bountyhunter', checkAuth, (req, res) => {
  db.User.findAll({where: {id: req.params.id}})
    .then((users) => {
      if(users.length > 0){ //if the user exists
        const stat = {
          gid: req.body.gid,
          uid: users[0].id,
          points: req.body.points,
          captures: req.body.captures,
          won: req.body.won
        }
        //try and create the stat
        db.BountyHunterStat.create(stat)
          .then((createdStat) => {
            //send a success response
            res.status(200).json({message:"Stat created"});
          })
          .catch(() => {
            res.status(500).json({message:"Unable to create stat"});
          });
      }else{ //if the user doesn't exist
        res.status(404).json({error:"User not found!"}); //send a 404 response
      }
    })
});


//ROUTES END HERE
////////////////////////////////////////////////////

module.exports = router;
