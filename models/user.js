//Import UUID library for unique ids for users
const uuid = require('uuid/v4');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true} },
    lastName: { type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true} },
    username: { type: DataTypes.STRING, allowNull: false, unique:true, validate: {notEmpty: true} },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique:true, validate: {isEmail:true}},
    active: { type: DataTypes.BOOLEAN, allowNull:false, defaultValue: true },
    verified: { type: DataTypes.BOOLEAN, allowNull:false, defaultValue: true },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.FugitiveStat, {as: "FugitiveStat", foreignKey: 'uid'});
    User.hasMany(models.BountyHunterStat, {as: "BountyHunterStat", foreignKey: 'uid'});
    User.hasMany(models.Friends, {as: "following", foreignKey: 'sender',onDelete: 'cascade'});
    User.hasMany(models.Friends, {as: "followers", foreignKey: 'receiver',onDelete: 'cascade'});
  };
  //Before every user is created, generate a uuid for them for their primary key.
  User.beforeCreate((user,opts) => {
    return user.id = uuid();
  });
  return User;
};
