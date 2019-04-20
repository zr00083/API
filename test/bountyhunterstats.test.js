//import all necessary librarys

const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const bcrypt = require('bcrypt');

//import database models
const db = require('../models');

//import helpers
const createUser = require('./helpers/create-user');
const loginUser = require('./helpers/login-user');
const createStat = require('./helpers/create-stat');
const deleteUser = require('./helpers/delete-user');

//import data
const Users = require('./data/users');
const Stats = require('./data/stats');

//configure chai
chai.use(chaiHttp);
chai.should();

describe("Bounty Hunter Statistics", () => {

  //before each test for the users function
  beforeEach(function(){
    //delete all data
    return db.BountyHunterStat.truncate({})
      .then(() => {
        return db.FugitiveStat.truncate({})
          .then(() => {
            return db.Friends.truncate({})
            .then(() => {
              return db.User.truncate({});
            });
          });
      });
  });
//GET /users/stats/:id/bountyhunter - gets the bountyhunter stats of the user
  describe("Get Statistics", () =>{
    it('should get all bounty hunter statistics for user', (done) => {
      //create a user
      createUser(Users.user1)
        .then((created_user) => {
          //create a bounty hunter stat for that user using the test statistic data
          createStat("bountyhunter", created_user, Stats.BountyHunter.stat1)
            .then(() => {
              //log the user in
              const token = loginUser(created_user);
              //attempt to get stats using the API
              chai.request(app)
                .get('/users/stats/'+created_user.id+"/bountyhunter") //GET /users/stats/:id/bountyhunter
                .set('Authorization', 'Bearer ' + token) //set authorization token to the token
                .end((err,res) => {
                  res.should.have.status(200); //should have 200 response code
                  res.body.should.be.a('object'); //body should be a JSON object
                  res.body.should.have.property('stats'); //and have property users
                  res.body.stats.should.have.length(1); //should have 1 statistic for the user
                  done();
                });
            })
        });
    });
  });
  it('if user account is not found', (done) => {
    createUser(Users.user1)
    .then(function(created_user) {
      const token = loginUser(created_user);
      deleteUser(created_user)
      .then(function() {
      chai.request(app)
      .get('/users/stats/'+created_user.id+"/bountyhunter")
      .set('Authorization', 'Bearer ' + token)
      .end((err,res) => {
        res.should.have.status(404)
        res.body.should.have.property('error');
        res.body.error.should.equal('User not found')
        done();
      });
    });
  });
});

});

/*
GET /users/stats/:id/bountyhunter - gets the bountyhunter stats of the user
REQUIRES AUTHORIZATION
- returns 200 if stats retrieved (response will be stats)
- returns 404 if user account is not found. (response will be {error: "User not found"})
- returns 500 if user stats NOT retrieved. (response will be {error: "Unable to retrieve fugitive stats"})
- returns 401 if user is NOT Authenticated (response will be
{error: "Authorization failed"})






    it('if user account is not found', (done) => {
            createUser(Users.user1)
        .then((created_user) => {
                createStat("bountyhunter", created_user, Stats.BountyHunter.stat1)
            .then(() => {
                    const token = loginUser(created_user);
                  chai.request(app)
                .get('/users/stats/'+created_user.id+"/bountyhunter")
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.should.have.property('{error: "User not found"}');
                  res.body.stats.should.have.length(1);
                  done();
                });
            })
        });
    });
    it('if user stats are not retrieved', (done) => {
            createUser(Users.user1)
        .then((created_user) => {
                createStat("bountyhunter", created_user, Stats.BountyHunter.stat1)
            .then(() => {
                    const token = loginUser(created_user);
                  chai.request(app)
                .get('/users/stats/'+created_user.id+"/bountyhunter")
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                  res.should.have.status(500);
                  res.body.should.be.a('object');
                  res.body.should.have.property('{error: "Unable to retrieve fugitive stats"}');
                  res.body.stats.should.have.length(1);
                  done();
                });
            })
        });
    });
    it('if user is not Authenticated', (done) => {
            createUser(Users.user1)
        .then((created_user) => {
                createStat("bountyhunter", created_user, Stats.BountyHunter.stat1)
            .then(() => {
                    const token = loginUser(created_user);
                  chai.request(app)
                .get('/users/stats/'+created_user.id+"/bountyhunter")
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                  res.should.have.status(401);
                  res.body.should.be.a('object');
                  res.body.should.have.property('{error: "Authorization failed"}');
                  res.body.stats.should.have.length(1);
                  done();
                });
            })
        });
    });


  });


  //bountyhunter stats for the user POST /users/stats/:id/bountyhunter

  describe("Make Statistics", () =>{
    it("creates bounty hunter stats for the user", (done) => {
      //example test
      chai.request(app)
        .post('/users/stats/'+created_user.id+"/bountyhunter")
        .get('/users/stats/'+created_user.id+"/bountyhunter")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('created');
          done();
        });
    });
    it("if user account is not found", (done) => {
      //example test
      chai.request(app)
        .post('/users/stats/'+created_user.id+"/bountyhunter")
        .get('/users/stats/'+created_user.id+"/bountyhunter")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error: "User not found"}');
          done();
        });
    });
    it("if user stat is not created", (done) => {
      //example test
      chai.request(app)
        .post('/users/stats/'+created_user.id+"/bountyhunter")
        .get('/users/stats/'+created_user.id+"/bountyhunter")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('{error: "Unable to create fugitive stats"}');
          done();
        });
    });
    it("user is not Authenticated", (done) => {
      //example test
      chai.request(app)
        .post('/users/stats/'+created_user.id+"/bountyhunter")
        .get('/users/stats/'+created_user.id+"/bountyhunter")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('{error: "Authorization failed"}');
          done();
        });
    });
  });

});
*/
