const fs = require('fs');
require('dotenv').config()

module.exports = {
  development: {
    dialect: 'postgres',
    use_env_variable: "DATABASE_URL"
  },
  test: {
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
