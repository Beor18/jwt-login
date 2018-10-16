const User = require('../models/User');
const Producto = require('../models/Producto');
const gravatar = require('gravatar');
const passport = require('passport');


async function getPerfil(req, res, next) {
    let token = req.query.secret_token;
    return res.json({
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        email: req.user.email,
        token: req.query.secret_token,
        productos_url: '/api/producto?secret_token=' + token
    });
}

async function getProducto(req, res, next) {
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
}

async function postProducto(req, res) {
    const producto = new Producto({
        titulo: req.body.titulo,
        autor: req.body.autor,
        foto: req.file.filename
    });
    await producto.save(() => {
        res.send("Producto agregado con éxito!");
        console.log("Producto e imagen agregado con éxito!");
    });

}

async function deleteProducto(req, res) {
    Producto.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return res.send(err);
        } else {
            res.send('Producto Borrado con éxito!');
        }
    });
}

module.exports = {
    getProducto,
    getPerfil,
    postProducto,
    deleteProducto
};