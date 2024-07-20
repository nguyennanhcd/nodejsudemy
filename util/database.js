const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejsudemy', 'root', '270605', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
