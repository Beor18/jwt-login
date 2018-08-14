const Validator = require('validator');
const isEmpty = require('./is-empy');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email es incorrecto';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email es requerido';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Minimo 6 caracteres';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password es requerido';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}