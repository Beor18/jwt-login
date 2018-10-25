const Producto = require('../models/Producto');
const passport = require('passport');

const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getProductos(req, res, next) {
    try {
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
    } catch (err) {
        log.error('Ups hubo un error al mostrar los productos! ' + err);
    }
}

async function getProductoPorId(req, res) {
    try {
        Producto.findById(req.params.id, function(err, producto) {
            //if (err) return next(err);
            res.json({
                producto
            });
        });
    } catch (err) {
        log.error('Ups hubo un error al mostrar el producto! ' + err);
    }
}

async function modificarProducto(req, res) {
    try {
        const { id } = req.params;
        await Producto.update({ _id: id }, req.body);
        res.send('Producto Modificado con éxito!')
        log.warn('Producto Modificado con éxito!');
    } catch (err) {
        log.error('Ups hubo un error al modificar el producto! ' + err);
    }

}

async function postProducto(req, res) {
    try {
        const producto = new Producto({
            titulo: req.body.titulo,
            autor: req.body.autor,
            foto: req.file.filename
        });
        await producto.save(() => {
            res.send("Producto agregado con éxito!");
            log.info("Producto e imagen agregado con éxito!");
        });
    } catch (err) {
        log.error('Ups hubo un error al agregar el producto! ' + err);
    }
}

async function deleteProducto(req, res) {
    try {
        Producto.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.send('Producto Borrado con éxito!');
                log.error('Producto Borrado con éxito!')
            }
        });
    } catch (err) {
        log.error('Ups hubo un error al borrar el producto! ' + err);
    }
}

module.exports = {
    getProductos,
    getProductoPorId,
    modificarProducto,
    postProducto,
    deleteProducto
};