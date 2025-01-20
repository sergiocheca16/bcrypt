const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido.' });
    }

    req.user = decoded;
    next();
  });
}

// Generar token JWT
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, secret, {
    expiresIn: '1h',
  });
}

module.exports = { verifyToken, generateToken };
