const Usuario = require('./Usuario');
const Administrativo = require('./Administrativo');

// Relación uno a uno: un Usuario puede ser un Administrativo
Usuario.hasOne(Administrativo, { foreignKey: 'ClaveUsuario', onDelete: 'CASCADE' });
Administrativo.belongsTo(Usuario, { foreignKey: 'ClaveUsuario' });

module.exports = { Usuario, Administrativo };
