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
  });
});
