const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 
 
exports.register = async (req, res) => { 
    console.log('Cuerpo recibido:', req.body); // Depuración del cuerpo recibido 
   
    const { name, email, password } = req.body; 
   
    if (!name || !email || !password) { 
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' }); 
    } 
   
    try { 
      // Resto del registro de usuario 
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = new User({ name, email, password: hashedPassword 
  }); 
      await newUser.save(); 
      res.status(201).json({ message: 'Usuario registrado con éxito.' }); 
    } catch (err) { 
      console.error(err); 
      res.status(500).json({ message: 'Error en el servidor.' }); 
    } 
  }; 
   
   
  exports.login = async (req, res) => { 
    const { email, password } = req.body; 
   
    if (!email || !password) { 
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' }); 
    } 
   
    try { 
      // Busca al usuario por email 
      const user = await User.findOne({ email }); 
      if (!user) { 
        return res.status(404).json({ message: 'Usuario no encontrado.' 
  }); 
      }
      // Verifica la contraseña 
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) { 
      return res.status(400).json({ message: 'Contraseña incorrecta.' 
}); 
    } 
 
    // Genera el token JWT 
    const token = jwt.sign( 
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Tiempo de expiración por defecto 
    ); 
 
    // Respuesta al cliente 
    res.json({ token, message: 'Inicio de sesión exitoso.' }); 
  } catch (err) { 
    console.error(err); 
    res.status(500).json({ message: 'Error en el servidor.' }); 
  } 
};