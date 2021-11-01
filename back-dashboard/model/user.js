const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		unique: true,
		required: true
	},
	confirmPassword: {
		type: String,
		required: true
	}
});

const validateLogin = (user) => {
	const schema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }).required(),
		password: Joi.string().required()
	});
	return schema.validate(user);
};
const validateRegister = (user) => {
	const schema = Joi.object({
		name: Joi.string().trim().required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }).required(),
		password: Joi.string().required(),
		confirmPassword: Joi.ref('password')
	});
	return schema.validate(user);
};
const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validateLogin = validateLogin;
exports.validateRegister = validateRegister;
