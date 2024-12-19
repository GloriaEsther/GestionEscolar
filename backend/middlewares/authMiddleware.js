const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = decoded;  // Decodificado del token (por ejemplo, incluir ClaveUsuario y rol)
    next();
  });
};

exports.verifyAdmin = async (req, res, next) => {
  try {
    // Extraer token del encabezado de autorización
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificamos el JWT

    // Consultar usuario en base de datos usando la ClaveUsuario decodificada
    const usuario = await Usuarios.findOne({ where: { ClaveUsuario: decoded.ClaveUsuario } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Validar rol
    if (usuario.rol !== 'administrativo') {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
    }

    // Guardar usuario en req para futuros usos
    req.usuario = usuario;
    next();  // Llamamos a next() para que la ruta se ejecute
  } catch (error) {
    console.error('Error en la verificación de rol administrativo:', error);
    res.status(500).json({ message: 'Error al verificar rol administrativo' });
  }
};


  