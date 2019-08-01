const Pelicula = require('../models/Pelicula');
const passport = require('passport');

const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getPeliculas(req, res, next) {
    try {
        let perPage = req.query.perPage || 9;
        perPage = Number(perPage);

        let page = req.query.page || 1;
        page = Number(page);

        await Pelicula
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, peliculas) => {
                Pelicula.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.status(200).json({
                        status: 'Api funcionando',
                        peliculas,
                        total: count,
                        resultados: perPage
                    });
                });
            });
    } catch (err) {
        log.error('Ups hubo un error al mostrar las peliculas! ' + err);
    }
}

async function getPeliculaPorId(req, res) {
    try {
        await Pelicula.findById(req.params.id, function(err, pelicula) {
            if (pelicula === null) {
                return res.status(404).json({mensaje: 'Pelicula no encontrada!'});
            }else {
                res.status(200).json({
                    status: 'Api funcionando',
                    pelicula
                });
            }
        });
    } catch (err) {
        log.error('Ups hubo un error al mostrar la Pelicula! ' + err);
    }
}

async function modificarPelicula(req, res) {
    try {
        const { id } = req.params;
        await Pelicula.update({ _id: id }, req.body);
        res.status(200).json('Pelicula Modificada con éxito!')
        log.warn('Pelicula Modificada con éxito!');
    } catch (err) {
        log.error('Ups hubo un error al modificar la pelicula! ' + err);
    }

}

async function postPelicula(req, res) {
    try {
        const pelicula = new Pelicula(req.body);
        await pelicula.save(() => {
            res.status(201).json("Pelicula agregada con éxito!");
            log.info("Peliculaagregada con éxito!");
        });
    } catch (err) {
        log.error('Ups hubo un error al agregar la pelicula! ' + err);
    }
}

async function deletePelicula(req, res) {
    try {
        await Pelicula.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.status(200).json('Pelicula Borrada con éxito!');
                log.error('Pelicula Borrada con éxito!')
            }
        });
    } catch (err) {
        log.error('Ups hubo un error al borrar la pelicula! ' + err);
    }
}

async function filtroEstrella(req, res) {
    try {
        await Pelicula.find({'stars': req.params.stars}, (err, pelicula) => {
            if (pelicula <= null) {
                return res.status(404).json({
                    mensaje: 'No encontrado!',
                    peliculas: pelicula,
                    err
                });
            } else {
                res.status(200).json({
                    status: 'Filtrado por estrella OK',
                    peliculas: pelicula
                });
            }
        })
    } catch (err) {
        log.error('Ups hubo un error!');
    }
}

module.exports = {
    getPeliculas,
    getPeliculaPorId,
    modificarPelicula,
    postPelicula,
    deletePelicula,
    filtroEstrella
};