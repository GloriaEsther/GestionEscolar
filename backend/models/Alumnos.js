const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Alumnos extends Model {}

Alumnos.init(
  {
    ClaveAlumno: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      validate: {//esto es una validacion
        notEmpty: true,
      },
    },
    NombreAlumno: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ApellidoPaterno: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ApellidoMaterno: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    CURP:{
      type:DataTypes.STRING(18),
      allowNull:false,
      validate: {
        len: [18, 18],
        notEmpty: true,
      },
    },
    NombreTutor:{
      type:DataTypes.STRING(45),
      allowNull:false,
      validate: {
        notEmpty: true,
      },
    },
    ApellidoPaternoT: {
      type:DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ApellidoMaternoT: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    },
    NumtelT: {
      type: DataTypes.BIGINT(20),
      allowNull:false,
      validate: {
        isInt: true,
      }, 
    },
    correoT:{
      type:DataTypes.STRING(45),
      allowNull:false,
      validate: {
        isEmail: true,
      },
    },
    FechaNacimiento:{
      type:DataTypes.DATE,
      allowNull:false,
      validate: {
        isDate: true,
      },
    },
    ClaveUsuario: {
      type: DataTypes.STRING(10),
      allowNull:false,
      references: {
        model: 'Usuario',
        key: 'ClaveUsuario',
      },
      onUpdate:'CASCADE',
      onDelete: 'CASCADE',
    },
    Registradopor:{
     type:DataTypes.STRING(10),
     allowNull:false,
      references: {
        model: 'Administrativo',
        key: 'ClaveAdmin',
      },
      onUpdate:'CASCADE',
      onDelete: 'CASCADE',
    },
    Reinscritopor:{
      type:DataTypes.STRING(10),
      allowNull:true,
       references: {
         model: 'Administrativo',
         key: 'ClaveAdmin',
       },
       onUpdate: 'CASCADE',
       onDelete: 'SET NULL',
     },
  },
  {
    sequelize: db,
    modelName: 'Alumno',
    tableName:'Alumno',
    timestamps: false,
  }
);
module.exports = Alumnos;