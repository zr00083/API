'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FugitiveStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gid: {
        allowNull: false,
        type: Sequelize.UUID
      },
      uid: {
        allowNull: false,
        type: Sequelize.UUID,
        unique:true
      },
      points: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      challengesComplete: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      challengesFailed: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      won: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FugitiveStats');
  }
};
