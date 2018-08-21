const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport');

const User = require('../models/User');
const Producto = require('../models/Producto');

router.get('/me', (req, res, next) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        token: req.query.secret_token
    });
});

router.get('/producto', async(req, res, next) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1
    const p = await Producto.find();
    return res.status(200).json(p);
});

router.post('/producto', async(req, res) => {
    const producto = new Producto(req.body);

    await producto.save(() => {
        user: req.user
        res.send("Producto agregado con éxito!");
    });
});

module.exports = router;