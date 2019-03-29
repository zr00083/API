'use strict';
module.exports = (sequelize, DataTypes) => {
  const FugitiveStat = sequelize.define('FugitiveStat', {
    id: { type: DataTypes.INTEGER, allowNull: false, unique: true},
    gid: { type: DataTypes.UUID, allowNull: false, unique: true},
    uid: { type: DataTypes.UUID, allowNull: false, unique: true},
    points: { type: DataTypes.INTEGER, allowNull: false,},
    challengesComplete: { type: DataTypes.INTEGER, allowNull: false,},
    challengesFailed: { type: DataTypes.INTEGER, allowNull: false,},
    won: { type: DataTypes.BOOLEAN, allowNull: false,},
  }, {});
  FugitiveStat.associate = function(models) {
    // associations can be defined here
    FugitiveStat.belongsTo(models.User);
  };
  return FugitiveStat;
};
