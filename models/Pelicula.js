const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PeliculaSchema = new Schema({
    name: { type: String },
    description: { type: String },
    stars: { type: Array },
    year: { type: Number },
    gender: { type: String },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Categorie' }]

});

const CategorieSchema = new Schema({
    name: { type: String },
    date: { type: Date, default: Date.now }
});

const Pelicula = mongoose.model('Pelicula', PeliculaSchema);
const Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports = {
    Pelicula,
    Categorie
};