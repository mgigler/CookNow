"use strict";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255
    },
    isChef: {
        type: Boolean,
        required: true,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    isAuthenticated: {
        type: Boolean,
        required: true,
        default: false
    },
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 3
    },
    firstName: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255
    },
    streetname: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255
    },
    houseNumber: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255
    },
    zipCode: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255
    },
    city: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255
    },
    country: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 255
    },
    userImage: {
        type: String,
        required: true
    },
    courseInstances: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course',
        required: true,
        default: []
    },
    restaurantName: {
        type: String,
        minLength: 1,
        maxlength: 255
    },
    /*restaurantImage: {
        type: String,
    },*/
    homepage: {
        type: String,
        minLength: 1,
        maxlength: 255
    },
    /*isValidated: {
        type: Boolean,
        required: true,
        default: false
    },*/
    courseIDs:
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Course',
            required: true,
            default: []
        },
});

UserSchema.set('versionKey', false);

// Export the User model
module.exports = mongoose.model('User', UserSchema);