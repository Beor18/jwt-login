// User.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rolesValidos = {
    values: ['administrador', 'usuario'],
    message: '{ VALUE } no es un rol valido'
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String, default: 'usuario', enum: rolesValidos
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;