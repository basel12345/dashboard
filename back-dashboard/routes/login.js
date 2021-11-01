const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validateLogin } = require('../model/user');
const router = express.Router();

router.post('/login', async (req, res) => {
	/* start validation by joi library */
	const { error } = validateLogin(req.body);
	if (error) {
		return res.send({
			status: false,
			message: error.details[0].message
		});
	}
	/* end validation by joi library */

	/* Make sure it is correct email and passsword*/
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid Email');

	const validPassword = await bcrypt.compare(req.body.password, user['password']);
	if (!validPassword) return res.status(400).send('Invalid Password');

	/**-----------------Token------------------*/
	const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
    res.send({ user, token });
});

module.exports = router;
