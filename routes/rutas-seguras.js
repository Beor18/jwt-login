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

// Ruta agregar categorias a una pelicula especifica
router.route('/peliculas/:id/categorias')
    .post(peliculaController.postCategories);

// Ruta filtro estrellas
router.route('/stars/:stars')
    .get(peliculaController.filtroEstrella);

router.route('/role')
    .get(peliculaController.rutaPruebaRole);


module.exports = router;