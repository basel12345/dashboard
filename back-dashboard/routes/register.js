const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateRegister, User } = require('../model/user');
const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		/** start validation by joi library*/
		const { error } = validateRegister(req.body);
		if (error) {
			return res.send({
				status: false,
				message: error.details[0].message
			});
		}
		/** end validation by joi library*/

		/* Make sure it is correct email*/
		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send('User already registered');

		user = await new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword
		});
		/*----------Encrypt------------*/
		const salt = await bcrypt.genSalt(10);
		user['password'] = await bcrypt.hash(user['password'], salt);
		user['confirmPassword'] = await bcrypt.hash(user['confirmPassword'], salt);

		/**-------------token------------*/
		const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');

		await user.save((err, user) => {
			if (err) {
				return res.send({
					status: false,
					message: err.message
				});
			}
			res.header('x-token-auth', token).send({
				status: true,
				message: 'user register',
				user: {
					name: user.name,
					email: user.email,
					id: user._id,
				},
				token
			});
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
