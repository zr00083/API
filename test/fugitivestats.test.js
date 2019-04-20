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

describe("Fugitive Statistics", () => {

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
//POST /users/stats/:id/fugitive - creates a fugitive stat for the user
  describe("Get Statistics", () =>{
    it('should get all fugitive statistics for user', (done) => {
      //create a user
      createUser(Users.user1)
        .then((created_user) => {
          //create a fugitive stat for that user using the test statistic data
          createStat("fugitive", created_user, Stats.Fugitive.stat1)
            .then(() => {
              //log the user in
              const token = loginUser(created_user);
              //attempt to get stats using the API
              chai.request(app)
                .get('/users/stats/'+created_user.id+"/fugitive") //GET /users/stats/:id/fugitive
                .set('Authorization', 'Bearer ' + token) //set authorization token to the token
                .end((err,res) => {
                  res.should.have.status(200); //should have 200 response code
                  res.body.should.be.a('object'); //body should be a JSON object
                  res.body.should.have.property('stats'); //and have property users
                  res.body.stats.should.have.length(1); //should have 1 statistic for the user

                  done();
                });
            });
        });
      });

  it('If user account is not found', (done) => {
    const user1  = Users.user1;
      createUser(user1)
      .then(function(created_user1){
      const token = loginUser(user);
      deleteUser(user)
      .then(function() {
            chai.request(app)
              .get('/users/stats/'+created_user.id+"/fugitive") //GET /users/stats/:id/fugitive
              .set('Authorization', 'Bearer ' + token) //set authorization token to the token
              .set('content-type', 'application/json')
              .end((err) => {
                res.should.have.status(404); //should have 200 response code
                res.body.should.be.a('object'); //body should be a JSON object
                res.body.should.have.property('Error'); //and have property users
                res.body.should.have.property('User not found');
                done();
              });
          });
      });
    });
    it("If user stats NOT retrieved", (done) => {
      const user1  = Users.user1;
        createUser(user1)
        .then(function(created_user1){
        const token = loginUser(user);
        deleteUser(user)
        .then(function() {
      chai.request(app)
        .get('/users/stats/'+created_user.id+"/fugitive") //post request
        .set('content-type', 'application/json') //sets the request body to json
        .end((err, res) => {
          res.should.have.status(500); //response should have status code 500
          res.body.should.be.a('object'); //response should be an object
          res.body.should.have.property('error'); //response should have the property error
          res.body.error.should.equal('Unable to retrieve fugitives stats'); //response should equal unable to create user
          done();
        });
    });
});
});
it("shouldn't get Fugitive Stats is not authenticated", (done) => {
  createUser(Users.user1).then((user) => { //create user using user1 details from data/users.js
    const token = loginUser(user); //logs in created user1
    chai.request(app)
      .get('/users/me') //get request
      .set('content-type', 'application/json') //sets the request body to json
      .end((err,res) => {
        res.should.have.status(401); //response should have status code 401
        res.body.should.be.a('object'); //response should be an object
        res.body.should.have.property('error'); //response should have the property error
        res.body.error.should.equal('Authorization failed'); //response should equal authorization failed
        done();
      });
  });
});
});
});






    /*
    it("should change user password", (done) => {
      const user1 = Users.user1; //sets user1 equal to user1 details from data/users.js
      createUser(user1) //creates user1
        .then(function(created_user1) {
          const token = loginUser(created_user1); //logs in created user1
          var LoginCredentials = {username:Users.user1.username, password: Users.user1.password}; //creates loginCredentials equal to user1's username and password
          chai.request(app)
            .put('/users/' + created_user1.id + '/changepassword') //put request
            .set('Authorization', 'Bearer ' + token) //sets the logged in user to authorized
            .set('content-type', 'application/json') //sets the request body to json
            .end((err,res) => {
            res.should.have.status(500); //response should have status code 500
            res.body.should.be.a('object'); //response should be an object
            res.body.should.have.property('error'); //response should have the property error
            res.body.error.should.equal('Unable to update password'); //response should be equal to unable to update password
            done();
          });
        });
    });
/*
    it("shouldn't update unfound user", (done) => {
      const user1 = Users.user1; //sets user1 equal to user1 details from data/users.js
      createUser(user1) //creates user1
        .then(function(created_user1){
          const token = loginUser(created_user1); //logs in created user1
          deleteUser(created_user1) //deletes user1
            .then(function() {
              chai.request(app)
                .put('/users/' + created_user1.id) //put request
                .set('Authorization', 'Bearer ' + token) //sets the logged in user to authorized
                .set('content-type', 'application/json') //sets the request body to json
                .end((err,res) => {
                  res.should.have.status(404); //response should have status code 404
                  res.body.should.be.a('object'); //response should be an object
                  res.body.should.have.property('error'); //response should have the property error
                  res.body.error.should.equal("User not found"); //response should equal user not found
                  done();

                  it("shouldn't get user if user is not found", (done) => {
                    const user1 = Users.user1; //sets user1 equal to user1 details from data/users.js
                    createUser(user1) //creates user1
                      .then(function(created_user1) {
                        const token = loginUser(created_user1); //logs in created user1
                        deleteUser(created_user1) //deletes user1
                          .then(function() {
                            chai.request(app)
                              .get('/users/' + created_user1.id) //get request
                              .set('Authorization', 'Bearer ' + token) //sets the logged in user to authorized
                              .set('content-type', 'application/json') //sets the request body to json
                              .end((err,res) => {
                              res.should.have.status(404); //response should have status code 404
                              res.body.should.be.a('object'); //response should be an object
                              res.body.should.have.property('error'); //response should have the property error
                              res.body.error.should.equal('User not found'); //response should equal user not found
                              done();



    GET /users/stats/:id/fugitive - gets the fugitive stats of the user
    REQUIRES AUTHORIZATION
    - returns 200 if stats retrieved (response will be stats)
    - returns 404 if user account is not found. (response will be {error: "User not found"})
    - returns 500 if user stats NOT retrieved. (response will be {error: "Unable to retrieve fugitive stats"})
    - returns 401 if user is NOT Authenticated (response will be
    {error: "Authorization failed"})
  *



      it('If user account is not found', (done) => {
          createUser(Users.user2).then((user) => {
          const token = loginUser(user);
          deleteUser(user)
          .then(function() {
                chai.request(app)
                  .get('/users/stats/'+created_user.id+"/fugitive") //GET /users/stats/:id/fugitive
                  .set('Authorization', 'Bearer ' + token) //set authorization token to the token
                  .set('content-type', 'application/json')
                  .end((err) => {
                    res.should.have.status(404); //should have 200 response code
                    res.body.should.be.a('object'); //body should be a JSON object
                    res.body.should.have.property('Error'); //and have property users
                    res.body.should.have.property('User not found');
                    done();
                  });
              })
          });
        });





        it('If user stats are not retrieved', (done) => {
          createUser(Users.user1)
            .then((created_user) => {
              createStat("fugitive", created_user, Stats.Fugitive.stat1)
                .then(() => {
                  const token = loginUser(created_user);
                  chai.request(app)
                    .get('/users/stats/'+created_user.id+"/fugitive")
                    .set('Authorization', 'Bearer ' + token)
                    .end((err) => {
                      res.should.have.status(500);
                      res.body.should.have.property('{error: "Unable to retrieve fugitive stats"}');
                      done();
                    });
                })
            });
          })
          it('User is NOT Authenticated', (done) => {
            createUser(Users.user1)
              .then((created_user) => {
                createStat("fugitive", created_user, Stats.Fugitive.stat1)
                  .then(() => {
                    const token = loginUser(created_user);
                    chai.request(app)
                      .get('/users/stats/'+created_user.id+"/fugitive")
                      .end((err) => {
                        res.should.have.status(401);
                        res.body.should.have.property('{error: "Authorization failed"}');
                        done();
                      });
                  })
              });
            })



    /*
    it('should get the BountyHunter stats for the user', (done) => {
      createUser(Users.user2)
      .then((created_user) => {
        createStat("bountyhunter", created_user, Stats.BountyHunter.stat2)
        .then(() => {
          const token = loginUser(created_user);
          chai.request(app)
          .get('users/stats'+created_user.id+"/bountyhunter")
          .set('Authorization', 'Bearer ' + token)
          .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
      //      res.body.should.have.property('Stats');
            res.body.stats.should.have.length(1);
            done();
          });
        })
      });
  })
  */


/*
  it('should get the BountyHunter stats for the user'), (done) => {
    createUser(Users.user2)
    .then(created_user) => {
      createStat("bountyhunter", created_user, Stats.BountyHunter.stat2)
      .then() => {
        const token = loginUser(created_user);
        chai.request(app)
        .get('users/stats'+created_user.id+"/bountyhunter")
        .set('Authorization', 'Bearer ' + token)
        .end((err.res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('stats');
          res.body.stats.should.have.length(1);
          done();
        });

      })
    });
  })


*



//test routes POST/users/stats/:id/fugituve
  describe("Make Statistics", () =>{
    it("creates a fugitive stat for the user", (done) => {

      chai.request(app)
        .post('/users/stats/'+created_user.id+"/fugitive")
        .get('/users/stats/'+created_user.id+"/fugitive")
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

      chai.request(app)
        .post('/users/stats/'+created_user.id+"/fugitive")
        .get('/users/stats/'+created_user.id+"/fugitive")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('{error: "User not found"}');
          done();
        });
    });
    it("User stats is not created", (done) => {

      chai.request(app)
        .post('/users/stats/'+created_user.id+"/fugitive")
        .get('/users/stats/'+created_user.id+"/fugitive")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('{error: "Unable to create fugitive stats"}');
          done();
        });
    });
    it("User is not Authenticated", (done) => {

      chai.request(app)
        .post('/users/stats/'+created_user.id+"/fugitive")
        .get('/users/stats/'+created_user.id+"/fugitive")
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
