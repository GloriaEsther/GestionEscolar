const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const Administrativo = require('./Administrativo'); // Asegúrate de importar correctamente

class Usuario extends Model {}

Usuario.init(
  {
    ClaveUsuario: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    correo: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    contrasena: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    rol: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Usuario',
  }
);

// Definir asociaciones
Usuario.hasOne(Administrativo, {
  foreignKey: 'ClaveUsuario', // La clave foránea que conecta las tablas
  as: 'administrativo',
});

module.exports = Usuario;
