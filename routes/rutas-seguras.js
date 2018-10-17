const express = require('express');
const router = express.Router();

const productoController = require('../controllers/producto.controller');
// Subir imagenes y/o fotos

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/imagenes-subidas');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + file.originalname.replace(path.extname(file.originalname), '_') + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// FIN Subir imagenes y/o fotos

router.get('/perfil', productoController.getPerfil);

// Ruta /productos
router.get('/productos', productoController.getProductos);

// Ruta /producto/agregar
router.post('/producto/agregar', upload.single('fotoproducto'), productoController.postProducto);

// Rutas /producto/ver/:id
router.get('/producto/ver/:id', productoController.getProductoPorId);

// Rutas /producto/modificar/:id
router.post('/producto/modificar/:id', upload.single('fotoproducto'), productoController.modificarProducto);

// Rutas /producto/delete/:id
router.delete('/producto/delete/:id', productoController.deleteProducto);


module.exports = router;