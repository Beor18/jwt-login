const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    titulo: { type: String },
    autor: { type: String },
    foto: { type: String }

});

const Producto = mongoose.model('productos', ProductoSchema);

module.exports = Producto;