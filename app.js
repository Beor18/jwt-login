const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hola');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server funcionando en puerto ${PORT}`);
});