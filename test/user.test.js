//import all necessary librarys
const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

//configure chai
chai.use(chaiHttp);
chai.should();

describe("User", () => {
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
    it("should register a new user", (done) => {
      let user = new User ({firstName: "John", lastName: "Smith", username: "johnsmith1", email: "johnsmith@example.com", password:"john123"})
      user.save((err, user) => {
        chai.request(app)
        .get('/')
        .send({firstName: "John", lastName: "Smith", username: "johnsmith1", email: "johnsmith@example.com", password:"john123"})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
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
