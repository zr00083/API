'use strict';
module.exports = (sequelize, DataTypes) => {
  const BountyHunterStat = sequelize.define('BountyHunterStat', {
    id: { type: DataTypes.INTEGER, allowNull: false, unique: true},
    gid: { type: DataTypes.UUID, allowNull: false, unique: true},
    uid: { type: DataTypes.UUID, allowNull: false, unique: true},
    points: { type: DataTypes.INTEGER, allowNull: false},
    captures: { type: DataTypes.INTEGER, allowNull: false},
    won: { type: DataTypes.BOOLEAN, allowNull: false},
  }, {});
  BountyHunterStat.associate = function(models) {
    // associations can be defined here
    BountyHunterStat.belongsTo(models.User);
  };
  return BountyHunterStat;
};
