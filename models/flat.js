'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flat = sequelize.define('Flat', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    bathrooms: {type: DataTypes.INTEGER, allowNull: false},
    bedrooms: {type: DataTypes.INTEGER, allowNull: false},
    isDiscount: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
  }, {
    tableName: 'flats',
  });
  Flat.associate = function (models) {
    Flat.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE',
    })
  };
  return Flat;
};
