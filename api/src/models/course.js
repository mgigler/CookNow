const mongoose = require('mongoose')
const Schema = require("mongoose");
const Rating = require('../models/rating')

//const RatingSchema = mongoose.Schema({
//    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//    firstName: {type: String, required: true, maxlength: 255},
//    rating: {type: Number, required: true, min: 1, max: 5},
//    title: {type: String, required: true, maxlength: 100},
//    description: {type: String, required: true, maxlength: 255},
//});
//
//RatingSchema.set('versionKey', false);
//RatingSchema.set('timestamps', true);

const CourseSchema = mongoose.Schema({
    title: {type: String, required: true, minLength: 5, maxlength: 255},
    description: {type: String, required: true, minLength: 10, maxlength: 1000},
    dishes: [{
        course: {type: String, required: true, minLength: 1, maxlength: 255},
        dish: {type: String, required: true, minLength: 1, maxlength: 500},

    }],
    ingredients: [{
        amount: {type: Number, required: true, min: 0.001, max: 9999},
        unit: {type: String, required: true, minLength: 1, maxlength: 10},
        ingredient: {type: String, required: true, minLength: 1, maxlength: 100},
    }],
    equipment: [{
        description: {type: String, required: true, minLength: 1, maxlength: 9999},
    }],
    cost: {type: Number, required: true, min: 1, max: 999.99},
    maxParticipants: {type: Number, required: true, min: 1, max: 99},
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    courseImage: {type: String, required: true},
    ratings: [Rating.schema],
    instances: [
        {
            startDate: {type: Date, required: true},
            endDate: {type: Date, required: true},
            bookable: {type: Boolean, default: true}

        }
    ]
});

CourseSchema.set('versionKey', false);
CourseSchema.set('timestamps', true);

module.exports = mongoose.model('Course', CourseSchema);
