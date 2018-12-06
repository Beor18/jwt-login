const express = require('express');
const router = express.Router();

const productoController = require('../controllers/producto.controller');
const perfilController = require('../controllers/perfil.controller');
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

router.get('/perfil', perfilController.getPerfil);

// Ruta /productos
router.get('/productos', productoController.getProductos);

// Ruta /productos
router.post('/productos', upload.single('fotoproducto'), productoController.postProducto);

// Rutas /productos/:id
router.get('/productos/:id', productoController.getProductoPorId);

// Rutas /productos/:id
router.put('/productos/:id', upload.single('fotoproducto'), productoController.modificarProducto);

// Rutas /productos/:id
router.delete('/productos/:id', productoController.deleteProducto);


module.exports = router;