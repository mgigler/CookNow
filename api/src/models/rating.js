"use strict";

const mongoose = require('mongoose')
const Schema = require("mongoose");

// Define the rating schema

const RatingSchema = mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    firstName: {type: String, required: true, minLength: 1, maxlength: 255},
    rating: {type: Number, required: true, min: 1, max: 5},
    title: {type: String, required: true, minLength: 1, maxlength: 100},
    description: {type: String, required: true, minLength: 1, maxlength: 255},
});

RatingSchema.set('versionKey', false);
RatingSchema.set('timestamps', true);

// Export the Dish model
module.exports = mongoose.model('Rating', RatingSchema);