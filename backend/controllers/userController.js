const crypto = require('crypto'); // Para generar claves únicas
const db = require('../config/database'); // Conexión a MySQL
const Usuario = require('../models/Usuario'); // Modelo Usuario
const Administrativo = require('../models/Administrativo'); // Modelo Administrativo

// Registrar usuario(controlador)
exports.registerUser = async (req, res) => {
  const { rol, correo, contrasena, nombre, apellidoPaterno, apellidoMaterno, telefono } = req.body;

  if (!rol || !correo || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporciona todos los datos requeridos' });
  }

  //const ClaveUsuario = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).substr(0, 10);
  const ClaveUsuario = crypto.randomBytes(5).toString('hex');
  console.log('ClaveUsuario generada:', ClaveUsuario);

  const t = await db.transaction(); // Inicia una transacción

  try {
    // Insertar en la tabla Usuario
    const usuario = await Usuario.create(
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

      const ClaveAdmin = crypto.randomBytes(5).toString('hex');
      console.log('ClaveAdmin:', ClaveAdmin);

      await Administrativo.create(
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
    if (!t.finished) {
      await t.rollback();
    }
    console.error(error);
    return res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
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
