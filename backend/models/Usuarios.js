const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const Administrativos = require('./Administrativo'); 
const Alumnos= require('./Alumnos');
class Usuarios extends Model {}

Usuarios.init(
  {
    ClaveUsuario: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      validate: {//esto es una validacion
        notEmpty: true,
        len: [10, 10], 
      },
    },
    correo: {
      type: DataTypes.STRING(45),
      allowNull: false ,
      unique: true,
      validate: {//esto es una validacion
        isEmail: true,
      },
    },
    contrasena: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {//esto es una validacion
        notEmpty: true,
        len: [10, 10],
      },
    },
    rol: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {//esto es una validacion
        notEmpty: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: 'Usuario',
    tableName:'Usuario',
    timestamps: false,//esto quita createdAt y updatedAt
  }
);

// Definir asociaciones
Usuarios.hasOne(Administrativos, {
  foreignKey: 'ClaveUsuario', // La clave foránea que conecta las tablas usuario y administrativo
  as: 'administrativo',
});

Usuarios.hasOne(Alumnos, {
  foreignKey: 'ClaveUsuario', // La clave foránea que conecta las tablas
  as: 'alumno',
});

module.exports = Usuarios;