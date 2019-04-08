'use strict';
module.exports = (sequelize, DataTypes) => {
  const FugitiveStat = sequelize.define('FugitiveStat', {
    gid: { type: DataTypes.UUID, allowNull: false},
    uid: { type: DataTypes.UUID, allowNull: false},
    points: { type: DataTypes.INTEGER, allowNull: false},
    challengesComplete: { type: DataTypes.INTEGER, allowNull: false},
    challengesFailed: { type: DataTypes.INTEGER, allowNull: false},
    won: { type: DataTypes.BOOLEAN, allowNull: false},
  }, {});
  FugitiveStat.associate = function(models) {
    // associations can be defined here
    FugitiveStat.belongsTo(models.User, {as: 'FugitiveStat', foreignKey: 'uid', onDelete: 'CASCADE'});
  };
  return FugitiveStat;
};
