const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Administrativos extends Model {}

Administrativos.init(
  {
    ClaveAdmin: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      validate: {//esto es una validacion
        notEmpty: true,
      },
    },
    Nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {//esto es una validacion
        notEmpty: true,
      },
    },
    ApellidoPaterno: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {//esto es una validacion
        notEmpty: true,
      },
    },
    ApellidoMaterno: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {//esto es una validacion
        notEmpty: true,
      },
    },
    NumTelefono: {
      type: DataTypes.BIGINT(20),
      allowNull:false,
      validate: {//esto es una validacion
        isInt: true,
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
  },
  {
    sequelize: db,
    modelName: 'Administrativo',
    tableName:'Administrativo',
    timestamps: false,
  }
);
module.exports = Administrativos;