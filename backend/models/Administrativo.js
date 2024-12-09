const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Administrativo extends Model {}

Administrativo.init(
  {
    ClaveAdmin: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    Nombre: {
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
    NumTelefono: {
      type: DataTypes.STRING(20),
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

module.exports = Administrativo;
