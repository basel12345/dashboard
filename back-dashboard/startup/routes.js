const cors = require('cors');
const express = require('express');
const order = require('../routes/orders');
const register = require('../routes/register');
const login = require('../routes/login');
const error = require('../middleware/error');
module.exports = (app) => {
	app.use(cors());
	app.use(express.json());
	app.use('/order', order);
	app.use('/auth', register);
	app.use('/auth', login);
    app.use(error);
};
