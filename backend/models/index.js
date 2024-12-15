const Usuarios = require('./Usuarios');
const Administrativos = require('./Administrativo');
const Alumnos =require("./Alumnos");
const Documento =require("./Documento");

// Relación uno a uno: un Usuario puede ser un Administrativo
Usuarios.hasOne(Administrativos, { foreignKey: 'ClaveUsuario', onDelete: 'CASCADE' });
Administrativos.belongsTo(Usuarios, { foreignKey: 'ClaveUsuario' });

//Un usuario tambien puede ser un alumno
Usuarios.hasOne(Alumnos, { foreignKey: 'ClaveUsuario', onDelete: 'CASCADE' });
Alumnos.belongsTo(Usuarios,{foreignKey:"ClaveUsuario"});

//Uno a muchos un admin puede registrar y reinscribir  a varios alumnos
Administrativos.hasMany(Alumnos,{foreignKey: 'Registradopor', as: 'registrados', /* Alias para los alumnos registrados*/});
Administrativos.hasMany(Alumnos, {foreignKey: 'Reinscritopor', as: 'reinscritos', /* Alias para los alumnos reinscritos*/ });

//relacion de la tabla alumno con la de administrativo
Alumnos.belongsTo(Administrativos, { 
    foreignKey: 'Registradopor',
    as: 'registrador', // Alias para acceder al administrativo que registró
  });
  
  Alumnos.belongsTo(Administrativos, {
    foreignKey: 'Reinscritopor',
    as: 'reinscriptor', // Alias para acceder al administrativo que reinscribió
  });

  //Un alumno puede tener varios documentos
  Alumnos.hasMany(Documento, {
    foreignKey: 'ClaveAlumno', // La clave foránea que conecta las tablas
    as: 'documentos',
  });
  //Un documento le pertenece a un alumno
  Documento.belongsTo(Alumnos, {
    foreignKey: 'ClaveAlumno', // Clave foránea en `Documento`
    as: 'alumno', // Alias para acceder al alumno desde un documento
  });  


module.exports = { Usuarios, Administrativos,Alumnos ,Documento};
