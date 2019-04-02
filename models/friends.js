'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define('Friends', {
    sender: { type: DataTypes.UUID, allowNull: false},
    receiver: { type: DataTypes.UUID, allowNull: false},
    blocked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  }, {});
  Friends.associate = function(models) {
    // associations can be defined here
    Friends.belongsTo(models.User, {as: 'followedBy', foreignKey: 'sender'});
    Friends.belongsTo(models.User, {as: 'followingUser', foreignKey: 'receiver'});
  };
  return Friends;
};
