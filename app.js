require('newrelic');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/db');
const cors = require('cors');
// const session = require('express-session'); (OPCIONAL)
// const MongoStore = require('connect-mongo')(session);

const rutasSeguras = require('./routes/rutas-seguras');
const users = require('./routes/user');

const { getLogger, logHandler, terminate } = require('@jwt/utils');
require('./config/passport')(passport);

const app = express();
const log = getLogger(__dirname, __filename)
const PORT = process.env.PORT || 5000;

// Manejo de sesiones (OPCIONAL)
// app.use(session({
//     secret: 'some-secret',
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({
//         mongooseConnection: config,
//     })
// }));

app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logHandler);

app.use('/api/users', users);
app.use('/api', passport.authenticate('jwt', { session: false }), rutasSeguras);

app.disable('etag');
app.disable('x-powered-by');

app.get('/', (req, res) => {
    if (req.user.role === 'administrador') {
        res.send('Hola api rest de Peliculas! creado por Fernando López y Logan');   
    } else {
        res.status(500).json({
            mensaje: 'Ups! Sin permisos. Por favor sea admin.'
        });
    }
});

if (!module.parent) {
    app.listen(PORT, () => {
        log.info(`Server funcionando en puerto ${PORT}`);
    })

    process.on('SIGINT', terminate(0, 'SIGINT'))
    process.on('SIGTERM', terminate(0, 'SIGTERM'))
    process.on('uncaughtException', terminate(1, 'uncaughtException'))
    process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
}