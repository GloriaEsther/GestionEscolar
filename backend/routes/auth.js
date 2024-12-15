const express = require('express');
const bcrypt = require('bcrypt');
const { Usuario, Administrativo } = require('../models');
const router = express.Router();

function generateRandomKey() {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

router.post('/register', async (req, res) => {
    const { rol, correo, contrasena, Nombre, ApellidoPaterno, ApellidoMaterno, NumTelefono } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const ClaveUsuario = generateRandomKey();

        // Registrar en la tabla Usuario
        const usuario = await Usuario.create({
            ClaveUsuario,
            correo,
            contrasena: hashedPassword,
            rol,
        });

        if (rol === 'administrativo') {
            const ClaveAdmin = generateRandomKey();

            // Registrar en la tabla Administrativo
            await Administrativo.create({
                ClaveAdmin,
                Nombre,
                ApellidoPaterno,
                ApellidoMaterno,
                NumTelefono,
                ClaveUsuario: usuario.ClaveUsuario,
            });

            return res.status(201).json({
                message: 'Usuario administrativo registrado',
                ClaveUsuario,
                ClaveAdmin,
            });
        }

        res.status(201).json({
            message: 'Usuario alumno registrado',
            ClaveUsuario,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar usuario' });
    }
});

module.exports = router;