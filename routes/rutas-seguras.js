const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport');

const User = require('../models/User');
const Producto = require('../models/Producto');

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

router.get('/perfil', (req, res, next) => {
    let token = req.query.secret_token;
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        token: req.query.secret_token,
        productos_url: '/api/producto?secret_token=' + token
    });
});

router.get('/producto', async(req, res, next) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1
    let perPage = req.query.perPage || 9;
    perPage = Number(perPage);

    let page = req.query.page || 1;
    page = Number(page);

    Producto
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, p) => {
            Producto.countDocuments((err, count) => {
                if (err) return next(err);
                res.json({
                    ok: true,
                    p,
                    cuantos: count,
                    resultados: perPage
                });
            });
        });
});

router.post('/producto', upload.single('fotoproducto'), async(req, res) => {
    const producto = new Producto({
        titulo: req.body.titulo,
        autor: req.body.autor,
        foto: req.file.filename
    });

    await producto.save(() => {
        //user: req.user
        res.send("Producto agregado con éxito!");
        console.log("Producto e imagen agregado con éxito!");
    });
});

module.exports = router;