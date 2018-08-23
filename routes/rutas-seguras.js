const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport');

const User = require('../models/User');
const Producto = require('../models/Producto');

router.get('/perfil', (req, res, next) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        token: req.query.secret_token
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
            Producto.count((err, count) => {
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

router.post('/producto', async(req, res) => {
    const producto = new Producto(req.body);

    await producto.save(() => {
        user: req.user
        res.send("Producto agregado con éxito!");
    });
});

module.exports = router;