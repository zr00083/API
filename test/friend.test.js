
//import all necessary librarys

const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

//import database models
const db = require('../models');

//import helpers
const createUser = require('./helpers/create-user');
const loginUser = require('./helpers/login-user');
const createFriend = require('./helpers/create-friends');
const deleteUser = require('./helpers/delete-user');
//import data


const Users = require('./data/users');

//configure chai
chai.use(chaiHttp);
chai.should();

describe("Friends", () => {

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
//GET /users/friends/:id/following - gets the list of all users who the user has friended.
  describe("Add Friends", () =>{
    it('get the list of players that user1 is following', (done) => {
      //load user test data
      const user1 = Users.user1;
      const user2 = Users.user2;
      //create user 2
      createUser(user2)
        .then((created_user2) => {
          //create user 1
          createUser(user1)
            .then((created_user1) =>{
              //create user 1 following user 2
              createFriend(created_user1, created_user2,0)
                .then(() => {
                  //log in user 1
                  const token = loginUser(created_user1);
                  //attempt to get friends using the API
                  chai.request(app)
                    .get('/users/friends/'+created_user1.id+"/following") //GET /users/friends/:id/following
                    .set('Authorization', 'Bearer ' + token) //set authorization token to the token
                    .end((err,res) => {
                      res.should.have.status(200); //should have 200 response code
                      res.body.should.be.a('object'); //body should be a JSON object
                      res.body.should.have.property('users'); //and have property users
                      done();
                    });
                });
            });
        })
    });
  });
});


    /*
    it('if user account is not found', (done) => {
                  chai.request(app)
                .get('/users/friends/'+created_user1.id+"/following")
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.should.have.property('{error: "User not found"}');
                  res.body.stats.should.have.length(1);
                  done();
                });
            })

    it('if user stats are not retrieved', (done) => {
            createUser(Users.user1)
        .then((created_user) => {
                createStat("bountyhunter", created_user, Stats.BountyHunter.stat1)
            .then(() => {
                    const token = loginUser(created_user);
                  chai.request(app)
                .get('/users/friends/'+created_user1.id+"/following")
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
                .get('/users/friends/'+created_user1.id+"/following")
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

//GET /users/friends/:id/followers - gets the list of all users who have friended the user with the id.
describe("list of users who have added the user as a Friend", () =>{
    it('get the list of players that follows user1', (done) => {
      const user1 = Users.user1;
      const user2 = Users.user2;
      createUser(user2)
        .then((created_user2) => {
          createUser(user1)
            .then((created_user1) =>{
              createFriend(created_user1, created_user2,0)
                .then(() => {
                  //log in user 1
                  const token = loginUser(created_user1);
                  //attempt to get friends using the API
                  chai.request(app)
                    .get('/users/friends/'+created_user1.id+"/followers") //GET /users/friends/:id/following
                    .set('Authorization', 'Bearer ' + token) //set authorization token to the token
                    .end((err,res) => {
                      res.should.have.status(200); //should have 200 response code
                      res.body.should.be.a('object'); //body should be a JSON object
                      res.body.should.have.property('users'); //and have property users
                      done();
                    });
                });
            });
        })
    });
    //...
    it('if user account is not found', (done) => {
                  chai.request(app)
                .get('/users/friends/'+created_user1.id+"/followers")
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.should.have.property('{error: "User not found"}');
                  res.body.stats.should.have.length(1);
                  done();
                });
            })

    it('if user stats are not retrieved', (done) => {
            createUser(Users.user1)
        .then((created_user) => {
                createStat("bountyhunter", created_user, Stats.BountyHunter.stat1)
            .then(() => {
                    const token = loginUser(created_user);
                  chai.request(app)
                .get('/users/friends/'+created_user1.id+"/followers")
                .set('Authorization', 'Bearer ' + token)
                .end((err,res) => {
                  res.should.have.status(500);
                  res.body.should.be.a('object');
                  res.body.should.have.property('{error: "Unable to retrieve followers"}');
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
                .get('/users/friends/'+created_user1.id+"/followers")
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

/*
POST /users/friends/:id/friend - the sender of this request will friend the user with id :id.
REQUIRES AUTHORIZATION
- returns 200 if user friended (response will be {message: "User friended"})
- returns 404 if user account is not found. (response will be {error: "User not found"})
- returns 500 if user NOT friended. (response will be {error: "Unable to add friend"})
- returns 500 if user already friended. (response will be {error: "Already following user"})
- returns 401 if user is NOT Authenticated (response will be
{error: "Authorization failed"})




  describe("User friended", () =>{
    it("the sender of this request will friend the user with id", (done) => {

      chai.request(app)
        .post('/users/friends/'+created_user.id+"/friend")
        .get('/users/friends/'+created_user.id+"/friend")
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
        .post('/users/friends/'+created_user.id+"/friend")
        .get('/users/friends/'+created_user.id+"/friend")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('{error: "User not found"}');
          done();
        });
    });
    it("if user is already friended", (done) => {

      chai.request(app)
        .post('/users/friends/'+created_user.id+"/friend")
        .get('/users/friends/'+created_user.id+"/friend")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('{error: "Unable to add friend"}');
          done();
        });
    });
    it("User is not Authenticated", (done) => {

      chai.request(app)
        .post('/users/friends/'+created_user.id+"/friend")
        .get('/users/friends/'+created_user.id+"/friend")
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


  describe("Remove Friends", () =>{
    /*
    DELETE /users/friends/:id/friend - the sender of this request will unfriend the user with id :id.
  REQUIRES AUTHORIZATION
  - returns 200 if user unfriended (response will be {message: "User unfriended"})
  - returns 404 if user account is not found. (response will be {error: "User not found"})
  - returns 500 if user NOT unfriended. (response will be {error: "Unable to unfriend user"})
  - returns 401 if user is NOT Authenticated (response will be
  {error: "Authorization failed"})
    *
    describe('Sender to unfriend the user with ID', () => {
          it('User is unfriended', (done) => {
                    chai.request(app)
                    .delete('/users/friend/' + friend.id)
              //   .post('/users/stats/'+created_user.id+"/bountyhunter")
                    .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a('object');
                          res.body.should.have.property('message: "User unfriended"!');
                      done();
                    });
              });
          });
          it('User account cannot be found', (done) => {
                    chai.request(app)
                    .delete('/users/friend/' + friend.id)
              //   .post('/users/stats/'+created_user.id+"/bountyhunter")
                    .end((err, res) => {
                          res.should.have.status(404);
                          res.body.should.be.a('object');
                          res.body.should.have.property('message: "User unfriended"!');
                      done();
                    });
              });
              it('User account cannot be found', (done) => {
                        chai.request(app)
                        .delete('/users/friend/' + friend.id)
                  //   .post('/users/stats/'+created_user.id+"/bountyhunter")
                        .end((err, res) => {
                              res.should.have.status(404);
                              res.body.should.be.a('object');
                              res.body.should.have.property('message: "User unfriended"!');
                          done();
                        });
                  });

  });


/*
POST /users/friends/:id/block - the sender of this request will block the user with id :id.
REQUIRES AUTHORIZATION
- returns 200 if user blocked (response will be {message: "User blocked"})
- returns 404 if user account is not found. (response will be {error: "User not found"})
- returns 500 if user NOT blocked. (response will be {error: "Unable to block user"})
- returns 401 if user is NOT Authenticated (response will be
{error: "Authorization failed"})


*
  describe("Add Block", () =>{
    it("the sender of this request will block the user with id", (done) => {

      chai.request(app)
        .post('/users/friends/'+created_user.id+"/block")
        .get('/users/friends/'+created_user.id+"/block")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('User unfriended');
          done();
        });
    });

    it("if user account is not found", (done) => {

      chai.request(app)
        .post('/users/friends/'+created_user.id+"/block")
        .get('/users/friends/'+created_user.id+"/block")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('user not found');
          done();
        });
    });

    it("the sender of this request will block the user with id", (done) => {

      chai.request(app)
        .post('/users/friends/'+created_user.id+"/block")
        .get('/users/friends/'+created_user.id+"/block")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('unable to block user');
          done();
        });
    });

    it("User is not Authenticated", (done) => {

      chai.request(app)
        .post('/users/friends/'+created_user.id+"/block")
        .get('/users/friends/'+created_user.id+"/block")
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error: authorization failed');
          done();
        });
    });
  });

  describe("Remove Block", () =>{
    it('User is unblocked', (done) => {
              chai.request(app)
              .delete('/users/friend/' + friend.id+"/block")
        //   .post('/users/stats/'+created_user.id+"/bountyhunter")
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message: "User blocked"');
                done();
              });
        });
    });
    it('User account cannot be found', (done) => {
              chai.request(app)
              .delete('/users/friend/' + friend.id+"/block")
        //   .post('/users/stats/'+created_user.id+"/bountyhunter")
              .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message: "User not found"!');
                done();
              });
        });
        it('User not unblocked f', (done) => {
                  chai.request(app)
                  .delete('/users/friend/' + friend.id +"/block")
            //   .post('/users/stats/'+created_user.id+"/bountyhunter")
                  .end((err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message: "Unable to unblock user!"');
                    done();
                  });
            });

            it('user is not Authenticated', (done) => {
                      chai.request(app)
                      .delete('/users/friend/' + friend.id +"/block")
                //   .post('/users/stats/'+created_user.id+"/bountyhunter")
                      .end((err, res) => {
                            res.should.have.status(401);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message: "Authorization failed.!"');
                        done();
                      });
                });
  });
  */
