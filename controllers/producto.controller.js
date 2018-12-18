const Producto = require('../models/Producto');
const passport = require('passport');

const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getProductos(req, res, next) {
    try {
        let perPage = req.query.perPage || 9;
        perPage = Number(perPage);

        let page = req.query.page || 1;
        page = Number(page);

        await Producto
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, p) => {
                Producto.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.status(200).json({
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
        await Producto.findById(req.params.id, function(err, producto) {
            if (producto === null) {
                return res.status(404).json({mensaje: 'Producto no encontrado!'});
            }else {
                res.status(200).json({
                    producto
                });
            }
        });
    } catch (err) {
        log.error('Ups hubo un error al mostrar el producto! ' + err);
    }
}

async function modificarProducto(req, res) {
    try {
        const { id } = req.params;
        await Producto.update({ _id: id }, req.body);
        res.status(200).json('Producto Modificado con éxito!')
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
            res.status(201).json("Producto agregado con éxito!");
            log.info("Producto e imagen agregado con éxito!");
        });
    } catch (err) {
        log.error('Ups hubo un error al agregar el producto! ' + err);
    }
}

async function deleteProducto(req, res) {
    try {
        await Producto.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.status(200).json('Producto Borrado con éxito!');
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