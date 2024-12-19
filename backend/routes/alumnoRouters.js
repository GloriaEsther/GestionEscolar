const express = require('express');//servidor
const { Usuarios, Administrativos } = require('../models'); // El modelo Usuario y Administrativo estén correctamente definidos
const router = express.Router();
//const crypto = require('crypto');
const db = require('../config/database'); // Configuración de base de datos
const alumnoController =require('../controllers/alumnoController');// Importar controlador
//const { createAlumno } = require('../controllers/alumnoController');  // Controlador para alumnos
//const { verifyAdmin } = require('../middlewares/authMiddleware');  // Middleware para verificar si el usuario es administrador
// Ruta protegida para crear un nuevo alumno (solo administradores)
//router.post('/alumnos', verifyAdmin, createAlumno);

//router.post('/crearalumno',verifyAdmin,alumnoController.createAlumno);
router.post('/crearalumno',alumnoController.createAlumno);
router.get('/test', (req, res) => {
    res.status(200).send('Ruta de prueba funcionando');
  });
  
module.exports = router;