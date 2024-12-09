const express = require('express');//servidor
const { Usuario, Administrativo } = require('../models'); // El modelo Usuario y Administrativo estén correctamente definidos
const router = express.Router();
const crypto = require('crypto');
const db = require('../config/database'); // Configuración de base de datos
const userController = require('../controllers/userController'); // Importar controlador

// Ruta para el login
router.post('/login', (req, res) => {
  const { ClaveUsuario, contrasena } = req.body;

  // Aquí puedes buscar el usuario en la base de datos
  Usuario.findOne({ where: { ClaveUsuario: ClaveUsuario } })
    .then((user) => {
      if (user && user.contrasena === contrasena) { // Esto es solo un ejemplo, deberías usar un sistema seguro para las contraseñas
        res.json({ message: 'Login exitoso', user });
      } else {
        res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error al procesar la solicitud' });
    });
});
// Ruta para el registro
router.post('/register', userController.registerUser);
module.exports = router;