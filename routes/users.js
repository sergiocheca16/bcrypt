const express = require('express');
const router = express.Router();
const users = require('../data/users');
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');

// Página de inicio
router.get('/', (req, res) => {
  if (req.session.user) {
    return res.json({ message: 'Bienvenido de nuevo.', dashboardLink: '/dashboard', logout: '/logout' });
  }
  res.json({ message: 'Inicie sesión.', loginForm: '/login' });
});

// Inicio de sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas.' });
  }

  const token = generateToken(user);
  req.session.user = user;
  res.json({ message: 'Inicio de sesión exitoso.', token, dashboardLink: '/dashboard' });
});

// Dashboard protegido
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Bienvenido al panel, ${req.user.username}.` });
});

// Cerrar sesión
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Sesión cerrada.' });
});

module.exports = router;
