const jwt = require('jsonwebtoken'); 
 
const auth = (req, res, next) => { 
  const token = req.header('Authorization')?.replace('Bearer ', ''); 
  if (!token) return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' }); 
 
  try { 
    const verified = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = verified; // Adjunta el payload del token al objeto `req` 
    next(); 
  } catch (err) { 
    res.status(400).json({ message: 'Token no válido.' }); 
  } 
}; 
 
module.exports = auth; 