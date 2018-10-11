const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validacion/registro');
const validateLoginInput = require('../validacion/login');

const User = require('../models/User');

async function postRegistro(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    await User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email ya existe'
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('Esto es un error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('Ups! Error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
}

async function postLogin(req, res) {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    await User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User no encontrado'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('Error en token', err);
                            else {

                                res.redirect('/api/perfil?secret_token=' + token);
                            }
                        });
                    } else {
                        errors.password = 'Pass incorrecta';
                        return res.status(400).json(errors);
                    }
                });
        });
}

module.exports = {
    postRegistro,
    postLogin
};