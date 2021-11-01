const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		trim: true
	},
	price: {
		type: Number,
		required: true,
		min: 5
	},
	type: {
		type: String,
		required: true
	}
});

const validateOrder = (order) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		price: Joi.number().min(5).required(),
		type: Joi.string().required()
	});

	return schema.validate(order);
};
const Order = mongoose.model('Order', OrderSchema);

exports.Order = Order;
exports.validate = validateOrder;
