const mongoose = require('mongoose'); 
 
const productSchema = mongoose.Schema( 
  { 
    name: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    description: { type: String }, 
    stock: { type: Number, default: 0 }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', 
required: true }, // Relación con el usuario 
  }, 
  { timestamps: true } 
); 
 
module.exports = mongoose.model('Product', productSchema);