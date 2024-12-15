const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const Alumnos= require('./Alumnos');
class Documento extends Model {}

Documento.init(
  {
    ClaveDoc: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      validate: {//esto es una validacion
        notEmpty: true,
      },
    },
    Nombre: {
      type: DataTypes.STRING(45),
      allowNull: false ,
      validate: {//esto es una validacion
        notEmpty: true,
      },
    },
   Tipo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {//esto es una validacion
        notEmpty: true,
      },
   },
   Fecha:{
    type: DataTypes.DATE,
    allowNull:false,
    validate: {
      isDate: true,
    },
   },
   ClaveAlumno:{
    type:DataTypes.STRING(10),
    allowNull:false,
     references: {
       model: 'Alumno',
       key: 'ClaveAlumno',
     },
     onUpdate:'CASCADE',
     onDelete: 'CASCADE',
   },
  },
  {
    sequelize: db,
    modelName: 'Documento',
    tableName:'Documento',
    timestamps: false,
  }
);

module.exports = Documento;