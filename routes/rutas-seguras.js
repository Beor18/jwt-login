const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport');

const User = require('../models/User');
const Producto = require('../models/Producto');
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

router.get('/producto', productoController.getProducto);

router.post('/producto', upload.single('fotoproducto'), async(req, res) => {
    const producto = new Producto({
        titulo: req.body.titulo,
        autor: req.body.autor,
        foto: req.file.filename
    });

    await producto.save(() => {
        res.send("Producto agregado con éxito!");
        console.log("Producto e imagen agregado con éxito!");
    });
});

module.exports = router;