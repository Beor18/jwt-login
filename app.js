const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const rutasSeguras = require('./routes/rutas-seguras');
const users = require('./routes/user');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database conectado!') },
    err => { console.log('Database NO conectado!' + err) }
);

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/users', users);
app.use('/api/users', passport.authenticate('jwt', { session: false }), rutasSeguras);

app.get('/', function(req, res) {
    res.send('Hola');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server funcionando en puerto ${PORT}`);
});