/*const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('escuela', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
*/
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // O el que uses
  host: 'localhost',
  username: 'root',
  password: '1234',
  database: 'telesecundaria',//escuela//escuela_telesecundaria
});

module.exports = sequelize;
