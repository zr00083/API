'use strict';
module.exports = (sequelize, DataTypes) => {
  const BountyHunterStat = sequelize.define('BountyHunterStat', {
    gid: { type: DataTypes.UUID, allowNull: false},
    uid: { type: DataTypes.UUID, allowNull: false},
    points: { type: DataTypes.INTEGER, allowNull: false},
    captures: { type: DataTypes.INTEGER, allowNull: false},
    won: { type: DataTypes.BOOLEAN, allowNull: false},
  }, {});
  BountyHunterStat.associate = function(models) {
    // associations can be defined here
    BountyHunterStat.belongsTo(models.User, {as: 'BountyHunterStat', foreignKey: 'uid', onDelete: 'CASCADE'});
  };
  return BountyHunterStat;
};
