const express = require('express');//servidor
const { Usuarios, Administrativos } = require('../models'); // El modelo Usuario y Administrativo estén correctamente definidos
const router = express.Router();
//const crypto = require('crypto');
const db = require('../config/database'); // Configuración de base de datos
const userController = require('../controllers/userController'); // Importar controlador

//Ruta para ver si el correo realmente no existe en la base de datos no se si funciona
router.post('/checacorreo', async (req, res) => {
  const { correo } = req.body;
  
  try {
    const existingUser = await Usuario.findOne({ where: { Correo: correo } });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    
    res.status(200).json({ message: 'El correo electrónico está disponible' });
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el correo', error });
  }
});

// Ruta para el login
router.post('/login', (req, res) => {
  const { ClaveUsuario, contrasena } = req.body;

  // Aquí puedes buscar el usuario en la base de datos
  Usuarios.findOne({ where: { ClaveUsuario: ClaveUsuario } })
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
