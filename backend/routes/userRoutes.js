const express = require('express');//servidor
const { Usuarios, Administrativos } = require('../models'); // El modelo Usuario y Administrativo estén correctamente definidos
const router = express.Router();
//const crypto = require('crypto');
const db = require('../config/database'); // Configuración de base de datos
const userController = require('../controllers/userController'); // Importar controlador
router.post('/register', userController.registerUser);//ruta sin proteger
// Ruta para el login
router.post('/login',userController.loginUser);//la llogica esta en en controlador
module.exports = router;
