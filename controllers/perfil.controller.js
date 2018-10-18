const User = require('../models/User');
const gravatar = require('gravatar');
const passport = require('passport');

async function getPerfil(req, res, next) {
    let token = req.query.secret_token;
    return res.json({
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        email: req.user.email,
        token: req.query.secret_token,
        productos_url: '/api/productos?secret_token=' + token
    });
}

module.exports = {
    getPerfil
};