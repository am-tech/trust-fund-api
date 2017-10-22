const dotenv = require('dotenv').config();

module.exports = {
  development: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  },
};
