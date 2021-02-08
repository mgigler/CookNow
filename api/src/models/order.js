const mongoose = require('mongoose')
const Schema = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    courseId: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
    courseInstancesId: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
    portions: {type: Number, required: true, min: 1, max: 4},
    deliveryTime: {type: Date, required: false},
    paid: {type: Boolean, required: true},
    paymentId: {type: String, required: true, minLength: 1, maxlength: 255},
    email: {type: String, required: true, minLength: 1, maxlength: 255},
    title: {type: String, required: true, minLength: 1, maxlength: 3},
    firstName: {type: String, required: true, minLength: 1, maxlength: 255},
    lastName: {type: String, required: true, minLength: 1, maxlength: 255},
    streetname: {type: String, required: true, minLength: 1, maxlength: 255},
    houseNumber: {type: String, required: true, minLength: 1, maxlength: 255},
    zipCode: {type: Number, required: true},
    city: {type: String, required: true, minLength: 1, maxlength: 255},
});

OrderSchema.set('versionKey', false);
OrderSchema.set('timestamps', true);

module.exports = mongoose.model('Order', OrderSchema);
