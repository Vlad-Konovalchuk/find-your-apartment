const fs = require('fs');
require('dotenv').config()

module.exports = {
  development: {
    host: '127.0.0.1',
    dialect: 'postgres',
    use_env_variable: "DATABASE_URL"
  },
  test: {
    host: '127.0.0.1',
    dialect: 'postgres',
    use_env_variable: "DATABASE_URL"
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    use_env_variable: "DATABASE_URL"
  }
};
