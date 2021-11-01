const express = require('express');
const { Order, validate } = require('../model/orders');
const token = require('../middleware/token');
const router = express.Router();

router.get('/getAllOrder', token, async (req, res) => {
	try {
		const order = await Order.find();
		res.send(order);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.get('/getOrderById/:id', token, async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) res.status(404).send('This order not found');
		res.send(order);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.post('/addOrder', token, async (req, res) => {
	try {
		/* start validation by joi library */
		const { error } = validate(req.body);
		if (error) {
			return res.send({
				status: false,
				message: error.details[0].message
			});
		}
		/* end validation by joi library */
		const newOrder = new Order({
			name: req.body.name,
			price: req.body.price,
			type: req.body.type
		});
		await newOrder.save((err, order) => {
			if (err) {
				return res.send({
					status: false,
					message: err.message
				});
			}
			res.send({
				status: true,
				message: 'Order saved',
				order
			});
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.put('/editOrderById/:id', token, async (req, res) => {
	try {
		/* start validation by joi library */
		const { error } = validate(req.body);
		if (error) {
			return res.send({
				status: false,
				message: error.details[0].message
			});
		}
		/* end validation by joi library */
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				price: req.body.price,
				type: req.body.type
			},
			{ new: true }
		);
		if (!order) res.status(404).send('This order not found');
		await order.save((err, order) => {
			if (err) {
				return res.send({
					status: false,
					message: err.message
				});
			}
			return res.send({
				status: true,
				message: 'Order Edited',
				order
			});
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.delete('/deleteById/:id', token, async (req, res) => {
	try {
		const order = await Order.findByIdAndRemove(req.params.id);
		if (!order) res.status(404).send('This order not found');
		res.send({
			status: true,
			message: 'Order removed',
			order
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
