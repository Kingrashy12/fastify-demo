require('dotenv/config');

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD?.toString(),
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD?.toString(),
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD?.toString(),
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    dialect: 'postgres',
  },
};
