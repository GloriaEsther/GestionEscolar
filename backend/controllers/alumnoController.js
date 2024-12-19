const db = require('../config/database'); // Conexión a MySQL
const Usuarios = require('../models/Usuarios'); // Modelo Usuario
const Administrativos = require('../models/Administrativo'); // Modelo Administrativo
const Alumnos =require('../models/Alumnos');
//const { getClaveGenerada } = require('./userController');//recupera la clave del usuario del controlador de usuarios 
let contador=1;
exports.createAlumno = async (req, res) => {//ya funciona pero se tiene que poner el correo en el front para comprobar si este tiene el rol de alumno y asi asociarlo a su clave de usuario
  try {
    const {NombreAlumno, ApellidoPaterno, ApellidoMaterno,CURP, Grado, FechaNacimiento,correo, NombreTutor, ApellidoPaternoT, ApellidoMaternoT, correoT,NumtelT, Registradopor,ClaveUsuario} = req.body;
     // Verifica si la correo de usuario existe en la tabla Usuarios
     const usuarioExistente = await Usuarios.findOne({
      where: { correo:correo },
    });
    /*const usuarioExistente = await Usuarios.findOne({
      where: { ClaveUsuario },
    });*/
    if (!usuarioExistente||usuarioExistente.rol !== 'alumno') {
      return res.status(404).json({ message: "Usuario no encontrada o el usuario no tiene el rol de Alumno" });
    }
    //comprobar que admin exista(esto es prueba)
    const administrativo = await Administrativos.findOne({
      where: { ClaveAdmin: Registradopor },
    });
    if (!administrativo) {
      return res.status(400).json({ message: "La clave de administrativo no existe" });
    }

    
    const alumnoExistente = await Alumnos.findOne({ where: { ClaveUsuario: usuarioExistente.ClaveUsuario } });//busca si ya hay un alumno registraso 
    //Generar la clave de ALUMNO
      function generarClaveAlumno() {
          const nombreParte = (NombreAlumno || '').slice(0, 2).toUpperCase(); // 2 caracteres del nombre
          const apellidoPaternoParte = (ApellidoPaterno || '').slice(0, 2).toUpperCase(); // 2 caracteres del apellido paterno
          const apellidoMaternoParte = (ApellidoMaterno || '').slice(0, 2).toUpperCase(); // 2 caracteres del apellido materno
          const numero = String(contador).padStart(4, '0');
         // const prefijo='AL';
          contador ++;
          return `${nombreParte}${apellidoPaternoParte}${apellidoMaternoParte}${numero}`; // Solo concatenamos las partes
      }
      const ClaveAlumno = generarClaveAlumno();
      console.log('ClaveAdmin:', ClaveAlumno);
  
     // const alumnoExistente = await Alumnos.findOne({ where: { ClaveAlumno: usuarioExistente.ClaveAlumno } });//busca si ya hay un alumno registraso con Clave alumno
      if (alumnoExistente) {
        return res.status(400).json({ message: 'El usuario ya tiene un registro como alumno' });
      }
      if(!ClaveAlumno||!NombreAlumno||!ApellidoPaterno||!ApellidoMaterno||!CURP||!Grado||!FechaNacimiento||!NombreTutor||!ApellidoPaternoT||!ApellidoMaternoT||!NumtelT||!correoT
        ||!usuarioExistente.ClaveUsuario||!Registradopor){
          return res.status(400).json({ message: 'Datos incompletos,intente de nuevo' });///esto es prueba...olvidalo si funciona
      }
      const alumnoData = {
        ClaveAlumno: ClaveAlumno,
        NombreAlumno: NombreAlumno,
        ApellidoPaterno:ApellidoPaterno,
        ApellidoMaterno:ApellidoMaterno,
        CURP:CURP,
        Grado:Grado,
        FechaNacimiento:FechaNacimiento,
        NombreTutor:NombreTutor,
        ApellidoPaternoT: ApellidoPaternoT,
        ApellidoMaternoT: ApellidoMaternoT,
        NumtelT: NumtelT,
        correoT:correoT,
        ClaveUsuario: usuarioExistente.ClaveUsuario,//ClaveUsuario,
        Registradopor:Registradopor,//este dato es la clave foranea del admin que hace el modulo de alta de usuario pero se tiene pensado que el admin ingrese ese valor(en el formulario)
        //por eso aqui se comprueba si dicha clave existe en la base y si tiene rol admin,lo mismo con correo de alumno pero lo ultimo con la intencion de relacionarlo con una clave de usuario
      };
    // Crear alumno
    const nuevoAlumno = await Alumnos.create(alumnoData);
    // Crear registro de alumno usando claveUsuario como referencia
    res.status(201).json({
      message: 'El alumno fue registrado exitosamente',
      alumno: nuevoAlumno,
      ClaveAlumno:nuevoAlumno.ClaveAlumno,
    });
  } catch (error) {
    console.error('Error al registrar alumno:', error);
    res.status(500).json({
      message: 'Error al registrar alumno',
      error,
    });
  }
};
//falta correo en el front 

  // Consultar todos los alumnos
  exports.getAlumnos = async (req, res) => {
    try {
      const alumnos = await Alumnos.findAll();
      res.status(200).json(alumnos);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
      res.status(500).json({
        message: 'Error al obtener alumnos',
        error,
      });
    }
  };
  
  // Consultar un alumno por ID
  exports.getAlumnoById = async (req, res) => {
    try {
      const alumno = await Alumnos.findByPk(req.params.id);
      if (!alumno) {
        return res.status(404).json({ message: 'Alumno no encontrado' });
      }
      res.status(200).json(alumno);
    } catch (error) {
      console.error('Error al obtener alumno:', error);
      res.status(500).json({
        message: 'Error al obtener alumno',
        error,
      });
    }
  };
  
  // Actualizar un alumno
  exports.updateAlumno = async (req, res) => {
    try {
      const alumno = await Alumnos.findByPk(req.params.id);
      if (!alumno) {
        return res.status(404).json({ message: 'Alumno no encontrado' });
      }
      await alumno.update(req.body);
      res.status(200).json({
        message: 'Alumno actualizado con éxito',
        alumno,
      });
    } catch (error) {
      console.error('Error al actualizar alumno:', error);
      res.status(500).json({
        message: 'Error al actualizar alumno',
        error,
      });
    }
  };
  