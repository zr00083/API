//import all necessary librarys
const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

//import database models
const db = require('../models');

//configure chai
chai.use(chaiHttp);
chai.should();

describe("Friends", () => {

  //before each test for the users function
  beforeEach(function(){
    //delete all users
    db.Friends.destroy({
      where: {},
      truncate: true
    });
  });
});
