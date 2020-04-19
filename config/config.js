const fs = require('fs');
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    use_env_variable: process.env.DATABASE_URL
  }
};
