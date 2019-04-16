//import all necessary librarys
const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const bcrypt = require('bcrypt');

//import database models
const db = require('../models');

//import helper functions
const createUser = require('./helpers/create-user');
const loginUser = require('./helpers/login-user')
//import test data
const Users = require('./data/users');

//configure chai
chai.use(chaiHttp);
chai.should();

describe("User", () => {

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

  describe("Register", () =>{
    it("should register a user", (done) => {
      //example test
      chai.request(app)
        .post('/users')
        .set('content-type', 'application/json')
        .send(Users.user1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('created');
          done();
        });
    });
  });


  describe("Login", () => {
    it('should login a user', (done) => {
      createUser(Users.user2).then(() => {
        var LoginCredentials = {username:Users.user2.username, password: Users.user2.password};
        chai.request(app)
          .post('/users/login')
          .set('Content-Type', 'application/json')
          .send(LoginCredentials)
          .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            done();
        });
      })
      .catch((err) => {
        console.log(err);
      })
    });

    it('should not login with an invalid username', (done) => {
    //  console.log(Users.user1);
      createUser(Users.user1).then(() => {
        var LoginCredentials = {username: "notauser", password: Users.user1.password};
        // console.log("LOGIN: " + )
        chai.request(app)
          .post('/users/login')
          .set('content-type', 'application/json')
          .send(LoginCredentials)
          .end((err,res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('Username not found');
            done();
          });
      });
    });

    it('should not login with an invalid password', (done) => {
    //  console.log(Users.user1);
      createUser(Users.user1).then(()=>{
        var LoginCredentials = {"username":Users.user1.username, "password": "example1"};
        chai.request(app)
          .post('/users/login')
          .set('content-type', 'application/json')
          .send(LoginCredentials)
          .end((err,res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('Incorrect Password');
            done();
          });
      });

    });

  });


  describe("Get User", () => {
    it("should get the user from database", (done) => {
      createUser(Users.user1).then((user) => {
        const token = loginUser(user);
        chai.request(app)
          .get('/users/me')
          .set('Authorization', 'Bearer ' + token)
          .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('email');
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.should.have.property('id');
            done();
          });
      });
    });

  });





});
