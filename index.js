require('dotenv').config(); 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const connectDB = require('./config/database'); 
const productRoutes = require('./routes/productRoutes'); 
const authRoutes = require('./routes/authRoutes'); 
 
const app = express(); 
 
// Conectar a MongoDB 
connectDB(); 
 
// Middleware para analizar JSON y datos de formularios 
app.use(bodyParser.json()); // Analiza cuerpos JSON 
app.use(bodyParser.urlencoded({ extended: false })); // Analiza datos codificados en URL 
 
// Rutas 
app.use('/api/products', productRoutes); 
app.use('/api/auth', authRoutes); 
 
// Iniciar servidor 
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
  console.log(`Servidor corriendo en el puerto ${PORT}`); 
});