const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
//todavia no termino,tengo que corregir administrativo en numero tel
class Alumno extends Model {}

Alumno.init(
  {
    ClaveAlumno: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    NombreAlumno: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    ApellidoPaterno: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    ApellidoMaterno: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    CURP:{
      type:DataTypes.STRING(18),
      allowNull:true,
    },
    NombreTutor:{
        type:DataTypes.STRING(45),
        allowNull:true,
    },
    ApellidoPaternoT: {
        type:DataTypes.STRING(45),
        allowNull: true,
    },
    ApellidoMaternoT: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    NumtelT: {
      type: DataTypes.BIGINT(20),
      allowNull:true,
    },
    correoT:{
        type:DataTypes.STRING(45),
    },
    FechaNacimeinto:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    ClaveUsuario: {
      type: DataTypes.STRING(10),
      allowNull:false,
      references: {
        model: 'Usuarios',
        key: 'ClaveUsuario',
      },
    },
  },
  {
    sequelize: db,
    modelName: 'Administrativo',
  }
);