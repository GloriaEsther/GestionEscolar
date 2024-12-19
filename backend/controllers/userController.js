const crypto = require('crypto'); // Para generar claves únicas
const db = require('../config/database'); // Conexión a MySQL
const Usuarios = require('../models/Usuarios'); // Modelo Usuario
const Administrativos = require('../models/Administrativo'); // Modelo Administrativo
let contador=1;
const Alumnos =require('../models/Alumnos');
//const jwt = require('jsonwebtoken');
//const claveGenerada = '';
//let claveGenerada = null;
function generarClaveUsuario() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Letras posibles
  let clave = '';
  
  // Generar diez letras aleatorias
  for (let i = 0; i < 10; i++) {
    const indice = crypto.randomInt(0, letras.length); // Genera un índice aleatorio
    clave += letras[indice]; // Agrega la letra a la clave
  }

  return clave; // Regresa la clave generada
}

// Registrar usuario(controlador) en postman es/register
exports.registerUser = async (req, res) => {
  const { rol, correo, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono } = req.body;
 
  if (!rol || !correo || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporciona todos los datos requeridos' });
  }
  
  // Generar clave
  const ClaveUsuario = generarClaveUsuario();//esto es el original
  //claveGenerada=generarClaveUsuario();
  console.log("ClaveUsuario generada:", ClaveUsuario);
  
  const t = await db.transaction(); // Inicia una transacción

  try {
    // Insertar en la tabla Usuario
    const existingUser = await Usuarios.findOne({ where: { correo } });
    
    if (existingUser) {//si existe
      return res.status(400).json({message: "Correo electronico existente"});
    }

    const usuario = await Usuarios.create(
      {
        ClaveUsuario,
        correo,
        contrasena,
        rol,
      },
      { transaction: t }
    );

    if (rol === 'administrativo') {
      if (!nombre || !apellidoPaterno || !apellidoMaterno || !telefono) {
        throw new Error('Faltan datos para registrar al administrativo');
      }

      //Generar la clave de Admin
      function generarClaveAdmin() {
        const nombreParte = (nombre || '').slice(0, 2).toUpperCase(); // 2 caracteres del nombre
        const apellidoPaternoParte = (apellidoPaterno || '').slice(0, 2).toUpperCase(); // 2 caracteres del apellido paterno
        const apellidoMaternoParte = (apellidoMaterno || '').slice(0, 2).toUpperCase(); // 2 caracteres del apellido materno
        const numero = String(contador).padStart(4, '0');
        contador ++;
        return `${nombreParte}${apellidoPaternoParte}${apellidoMaternoParte}${numero}`; // Solo concatenamos las partes
      }
      const ClaveAdmin = generarClaveAdmin();
      console.log('ClaveAdmin:', ClaveAdmin);

      await Administrativos.create(
        {
          ClaveAdmin,
          Nombre: nombre,
          ApellidoPaterno: apellidoPaterno,
          ApellidoMaterno: apellidoMaterno,
          NumTelefono: telefono,
          ClaveUsuario:ClaveUsuario,
        },
        { transaction: t }
      );

      await t.commit(); // Confirma la transacción
      return res.status(201).json({ message: 'Usuario administrativo registrado', ClaveUsuario, ClaveAdmin });
    } else if (rol === 'alumno') {
      try {//en el try apenas es prueba con esto se crea el usuario alumno y se manda la clave al endpoint de alumnos para terminar el registro de los detalles del alumno(alta de alumno)
        // Crea el usuario (ya existente en tu código)
        await t.commit(); // Confirma la transacción de Usuarios
    
        // Envía la clave de usuario al cliente para usarla en la creación del alumno
        return res.status(201).json({
          message: 'Usuario alumno registrado, ahora registra los detalles del alumno',
          ClaveUsuario, // Clave del usuario recién creado
        });
      } catch (error) {
        console.error('Error al registrar alumno:', error);
        await t.rollback();
        return res.status(500).json({
          message: 'Error al registrar el usuario y alumno',
          error,
        });
      }
      //await t.commit(); // Confirma la transacción
      //return res.status(201).json({ message: 'Usuario alumno registrado', ClaveUsuario });
    } else {
      throw new Error('Rol no válido');
    }
  } catch (error) {
    // Revierte la transacción solo si aún no ha sido confirmada
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ message: "Error al registrar el usuario." });
    } 
    else if (!t.finished) {//el if de arriba apenas lo puse
      await t.rollback();
    }
    console.error(error);
   return res.status(500).json({ message: 'Error al registrar usuario'});
  }
};

//exports.getClaveGenerada = () => claveGenerada;//claveusuario
// Login de usuario//lo mismo pero es /login
exports.loginUser = async (req, res) => {
  const { ClaveUsuario, contrasena } = req.body;

  // Validar datos
  if (!ClaveUsuario || !contrasena) {
    return res
      .status(400)
      .json({ error: true, message: 'Datos incompletos' });
  }

  try {
    // Buscar el usuario por ClaveUsuario
   const usuario = await Usuarios.findOne({ where: { ClaveUsuario } });
    if (usuario.ClaveUsuario!==usuario.ClaveUsuario || usuario.contrasena !==usuario.contrasena) {
      // Usuario no encontrado
      return res
        .status(404)
        .json({ error: true, message: 'Usuario o contrasena incorrectos' });
    }
    /*const token = jwt.sign(
      { ClaveUsuario: usuario.ClaveUsuario, rol: usuario.rol }, // Datos que deseas incluir en el token
      process.env.JWT_SECRET, // La clave secreta (esto debe estar en tu archivo .env)
      { expiresIn: '1h' } // El token expira en 1 hora
    );*/


    // Usuario y contraseña válidos
    return res.status(200).json({
      error: false,
      message: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        ClaveUsuario: usuario.ClaveUsuario,
        rol: usuario.rol, // Asegúrate de que el rol exista en tu modelo
        contrasena:usuario.contrasena,
      },
    });
    // Devolver el token
    //res.json({ token });
  } catch (error) {
    console.error('Error durante el login:', error);
    return res.status(500).json({
      error: true,
      message: 'Error al iniciar sesión, inténtalo más tarde',
      details: error.message,
    });
  }
};
