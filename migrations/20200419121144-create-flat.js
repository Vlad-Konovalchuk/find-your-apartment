'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Flats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      description: {type: Sequelize.STRING, allowNull: false},
      price: {type: Sequelize.INTEGER, allowNull: false},
      image: {type: Sequelize.STRING, allowNull: false},
      bathrooms: {type: Sequelize.INTEGER, allowNull: false},
      bedrooms: {type: Sequelize.INTEGER, allowNull: false},
      isDiscount: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
      userId: {type: Sequelize.INTEGER, allowNull: false},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Flats');
  }
};
