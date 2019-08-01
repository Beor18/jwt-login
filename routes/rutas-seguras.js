const express = require('express');
const router = express.Router();

const peliculaController = require('../controllers/pelicula.controller');
const perfilController = require('../controllers/perfil.controller');

router.route('/perfil')
    .get(perfilController.getPerfil);

// Ruta /productos
router.route('/peliculas')
    .get(peliculaController.getPeliculas)
    .post(peliculaController.postPelicula);

// Rutas /productos/:id
router.route('/peliculas/:id')
    .get(peliculaController.getPeliculaPorId)
    .put(peliculaController.modificarPelicula)
    .delete(peliculaController.deletePelicula);

// Ruta filtro estrellas
router.route('/stars/:stars')
    .get(peliculaController.filtroEstrella);


module.exports = router;