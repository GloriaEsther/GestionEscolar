const express = require('express');
const cors = require('cors'); // Para habilitar CORS (comunicación entre cliente y servidor)
const sequelize = require('./config/database'); // Configuración de Sequelize
//const bodyParser = require('body-parser');
const app = express();
const port = 8000; // Cambiar el puerto según lo necesites

// Importar modelos
const { Usuarios, Administrativos,Alumnos,Documento } = require('./models'); 

// Importar rutas
const userRoutes = require('./routes/userRoutes'); // Rutas para usuarios 

// Middleware
app.use(express.json()); // Para procesar solicitudes JSON
app.use(cors()); // Habilitar CORS para permitir comunicación entre cliente y servidor

// Conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .then(() => sequelize.sync({ alter: true })) // Sincroniza las tablas automáticamente según los modelos
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

// Rutas usuarios
app.use('/api/users', userRoutes); // Las rutas para usuarios tendrán el prefijo /api/users

// Ruta base para verificar el estado del servidor
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});