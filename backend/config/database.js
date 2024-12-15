const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // O el que uses
  host: 'localhost',
  username: 'root',
  password: '1234',
  database: 'telesecundaria_lazaro'//'telesecundaria_'//'telesecundaria_lazaro'(esa la entrego)//'telesecundaria' en esta ya esta pero hay que corregir   ,//escuela//escuela_telesecundaria
});

module.exports = sequelize;
