const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://localhost:27017/auth';
// 'mongodb://localhost/test' 

mongoose.connect(uri, { useNewUrlParser: true })
    .then(function() {
        console.log('Conectado a la Base de Datos con éxito!');
    }).catch(function(err) {
        console.log('Ups! Hubo un error al conectar con la base de datos!');
        console.log(err.message);
    });

module.exports = mongoose.connection;
// conecction.js