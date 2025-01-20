const express = require('express');
const session = require('express-session');
const { secret } = require('./crypto/config');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

// Middlewares para parsear solicitudes JSON y formularios
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios

// Configuración de sesión
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

// Rutas
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Express está escuchando en el puerto http://localhost:${PORT}`);
});

