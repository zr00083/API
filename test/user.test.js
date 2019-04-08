//import all necessary librarys
const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

//including helper functions
const createUser = require('./helpers/create-user');

//including test data
const Users = require('./data/users');

//import database models
const db = require('../models');

//configure chai
chai.use(chaiHttp);
chai.should();

describe("User", () => {

  //before each test for the users function
  beforeEach(function(){
    //delete all users
    db.User.destroy({
      where: {},
      truncate: true
    });
  });

  describe("Register", () =>{
    it("should register a user", (done) => {
      //example test
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

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
      createUser(Users.user1);
              const LoginCredentials = {"username":Users.user1.username, "password": Users.user1.password};

              chai.request(app)
                .post('/users/login')
                .set('content-type', 'application/json')
                .send(LoginCredentials)
                .end((err,res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('token');
                  done();
                });
    });
    it('should not login with an invalid username', (done) => {
      createUser(Users.user1);
      const LoginCredentials = {"username":"123", "password": Users.user1.password};
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
});


// it("should NOT register a user", (done) => {
//   let user = {
//     firstName: "John",
//     lastName: "Smith",
//     email: "johnsmith@example.com",
//     password:"john123"
//   }
//   chai.request(app)
//   .get('/')
//   .end((err, res) => {
//     res.should.have.status(500);
//     res.body.should.be.a('object');
//     res.body.should.have.property('errors');
//     res.body.errors.should.have.property('username');
//   })
// })
