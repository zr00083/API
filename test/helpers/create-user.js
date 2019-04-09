const bcrypt = require('bcrypt');

//import database models
const db = require('../../models');

var createUser = function(user) {
  //hash the password "test"
  bcrypt.hash(user.password, 10)
    .then((hash) => {
      //build the user object
      user.password = hash
      //create the user object
      db.User.create(user).catch((err) => {
        console.log(err);
      });
    });
}

module.exports = createUser;
