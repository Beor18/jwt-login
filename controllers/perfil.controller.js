const User = require('../models/User');
const gravatar = require('gravatar');
const passport = require('passport');
const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)

async function getPerfil(req, res, next) {
    try {
        let token = req.query.secret_token;
        return res.json({
            id: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar,
            email: req.user.email,
            token: req.query.secret_token,
            productos_url: '/api/productos?secret_token=' + token
        });
    } catch (err) {
        log.error('Ups Hubo un error! ' + err);
    }
}

module.exports = {
    getPerfil
};