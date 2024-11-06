const Sequelize = require('sequelize');
const config = require('./config');
require('dotenv/config');

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

module.exports = sequelize;
