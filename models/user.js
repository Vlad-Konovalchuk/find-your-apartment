'use strict';
const {comparePasswords, cryptPassword} = require("../utils/password");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      unique: true,
    },
    lastName: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    tableName: 'users',
  });
  User.associate = models => {
    User.hasMany(models.Flat, {
      foreignKey: 'userId',
      as: 'flats',
      onDelete: 'CASCADE',
    });
  };
  User.prototype.generateToken = async function () {
    try {
      const t = await jwt.sign({id: this.id, emal: this.email}, SECRET_KEY, {
        expiresIn: "24h"
      });
      return t;
    } catch (error) {
      throw new Error(error);
    }
  };
  User.prototype.checkPassword = async function (password) {
    return !!(await comparePasswords(password, this.password));
  };
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.beforeCreate(async function (user, options) {
    try {
      user.password = await cryptPassword(user.password);
    } catch (err) {
      if (err) console.log(err);
    }
  });

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: {username: login},
    });

    if (!user) {
      user = await User.findOne({
        where: {email: login},
      });
    }

    return user;
  };
  return User;
};
