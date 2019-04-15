//import all necessary librarys
const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

//import database models
const db = require('../models');

//import helpers
const createUser = require('./helpers/create-user');
const loginUser = require('./helpers/login-user');
const createStat = require('./helpers/create-stat');
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
})

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


*/
  describe("Make Statistics", () =>{

  });

});
