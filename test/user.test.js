//import all necessary librarys
const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const bcrypt = require('bcrypt');

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
      const User = {"firstName":"Kieran","lastName":"Rigby", "email":"blah@blah.com", "username":"testing","password":"test"};
      //example test
      chai.request(app)
        .post('/users')
        .set('content-type', 'application/json')
        .send(User)
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
      //hash the password "test"
      bcrypt.hash("test", 10)
        .then((hash) => {
          //build the user object
          const User = {"firstName":"Kieran","lastName":"Rigby", "email":"blah2@blah.com", "username":"testing2","password":hash};
          //create the user object
          db.User.create(User)
            .then(() => {
              const LoginCredentials = {"username":"testing2", "password": "test"};

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
