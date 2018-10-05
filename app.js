const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/db');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const rutasSeguras = require('./routes/rutas-seguras');
const users = require('./routes/user');

const { getLogger, logHandler, terminate } = require('@jwt/utils')

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// Manejo de sesiones
app.use(session({
    secret: 'some-secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: config,
    })
}));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logHandler);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', users);
app.use('/api', passport.authenticate('jwt', { session: false }), rutasSeguras);

app.get('/', function(req, res) {
    res.send('Hola');
});

const log = getLogger(__dirname, __filename)
const PORT = process.env.PORT || 5000;

if (!module.parent) {
    app.listen(PORT, () => {
        log.info(`Server funcionando en puerto ${PORT}`);
    })

    process.on('SIGINT', terminate(0, 'SIGINT'))
    process.on('SIGTERM', terminate(0, 'SIGTERM'))
    process.on('uncaughtException', terminate(1, 'uncaughtException'))
    process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
}