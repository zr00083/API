//Import UUID library for unique ids for users
const uuid = require('uuid/v4');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define('Friends', {
    id: { type: DataTypes.INTEGER, allowNull: false, unique: true, validate: {notEmpty: true}},
    sender: { type: DataTypes.UUID, allowNull: false, unique: true, validate: {notEmpty: true}},
    receiver: { type: DataTypes.UUID, allowNull: false, unique: true, validate: {notEmpty: true}},
    blocked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, validate: {notEmpty: true}},
  }, {});
  Friends.associate = function(models) {
    // associations can be defined here
    Friends.belongsTo(models.User);
  };
  return Friends;
};
