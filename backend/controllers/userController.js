const crypto = require('crypto'); // Para generar claves únicas
const db = require('../config/database'); // Conexión a MySQL
const Usuarios = require('../models/Usuarios'); // Modelo Usuario
const Administrativos = require('../models/Administrativo'); // Modelo Administrativo
let contador=1;

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

// Registrar usuario(controlador)
exports.registerUser = async (req, res) => {
  const { rol, correo, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono } = req.body;
 
  if (!rol || !correo || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporciona todos los datos requeridos' });
  }
  
  // Generar clave
  const ClaveUsuario = generarClaveUsuario();
  console.log("ClaveUsuario generada:", ClaveUsuario);

  const t = await db.transaction(); // Inicia una transacción

  try {
    // Insertar en la tabla Usuario
    const existingUser = await Usuarios.findOne({ where: { correo } });
    if (existingUser) {
     // return res.status(400).json({ message: "El correo electrónico ya está registrado." });
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
      const ClaveAdmin = generarClaveAdmin();//crypto.randomBytes(5).toString('hex');
      console.log('ClaveAdmin:', ClaveAdmin);

      await Administrativos.create(
        {
          ClaveAdmin,
          Nombre: nombre,
          ApellidoPaterno: apellidoPaterno,
          ApellidoMaterno: apellidoMaterno,
          NumTelefono: telefono,
          ClaveUsuario: ClaveUsuario,
        },
        { transaction: t }
      );

      await t.commit(); // Confirma la transacción
      return res.status(201).json({ message: 'Usuario administrativo registrado', ClaveUsuario, ClaveAdmin });
    } else if (rol === 'alumno') {
      await t.commit(); // Confirma la transacción
      return res.status(201).json({ message: 'Usuario alumno registrado', ClaveUsuario });
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

// Login de usuario
exports.loginUser = async (req, res) => {
  const { ClaveUsuario, contrasena } = req.body;

  // Validar datos
  if (!ClaveUsuario || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporciona ClaveUsuario y contraseña' });
  }

  try {
    // Consultar el usuario en la base de datos
    const [user] = await db.query(
      'SELECT * FROM Usuarios WHERE ClaveUsuario = ? AND contrasena = ?',
      [ClaveUsuario, contrasena]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: 'Clave o contraseña incorrectos' });
    }

    res.status(200).json({ message: 'Login exitoso', usuario: user[0] });
  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};