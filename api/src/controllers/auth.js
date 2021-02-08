"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const minioClient = require('../minio').minioClient;
const mongoose = require('mongoose');

const UserModel = require('../models/user');


const login = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain an email property'
    });
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });
    try {
        let user = await UserModel.findOne({email: req.body.email}).exec();

        // check if the password is valid
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).send({token: null});

        // if user is found and password is valid
        // create a token
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            isChef: user.isChef
        }, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        return res.status(200).json({token: token});
    } catch (err) {
        console.log("ERR: ",res)
        return res.status(404).json({
            error: 'User Not Found',
            message: err.message
        });
    }
};


const registerCustomer = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain an email property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'title')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a title property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'firstname')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a firstname property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'lastname')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a lastname property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'streetname')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a streetname property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'houseNumber')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a houseNumber property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'zipCode')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a zipCode property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'city')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a city property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'country')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a country property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.file, 'buffer')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a userImage property'
        });
    }

    const id = mongoose.Types.ObjectId();
    const filename = "u_" + id + ".jpg";
    const img = await sharp(req.file.buffer).resize(400, 400).toFormat('png').toBuffer();
    const filepath = "user/" + filename;
    minioClient.putObject("cooknow", filepath, img, function (error, etag) {
        if (error) {
            return console.log(error);
        }
    });

    const user = Object.assign({
        _id: id,
        email: req.body.email,
        password: req.body.password,
        isChef: false,
        verificationToken: '',
        isAuthenticated: true,
        title: req.body.title,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        streetname: req.body.streetname,
        houseNumber: req.body.houseNumber,
        zipCode: req.body.zipCode,
        city: req.body.city,
        country: req.body.country,
        userImage: filepath,
        courses: []
    }, {password: bcrypt.hashSync(req.body.password, 8)});
    try {
        let retUser = await UserModel.create(user);

        // if user is registered without errors
        // create a token
        const token = jwt.sign({id: retUser._id, email: retUser.email}, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({token: token});
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                error: 'User exists',
                message: err.message
            });
        } else {
            return res.status(500).json({
                error: 'Internal server error',
                message: err.message
            });
        }
    }
};

const registerChef = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain an email property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'title')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a title property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'firstname')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a firstname property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'lastname')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a lastname property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'streetname')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a streetname property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'houseNumber')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a houseNumber property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'zipCode')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a zipCode property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'city')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a city property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, 'country')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a country property'
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.file, 'buffer')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a userImage property'
        });
    }

    const id = mongoose.Types.ObjectId();
    const filename = "u_" + id + ".jpg";
    const img = await sharp(req.file.buffer).resize(400, 400).toFormat('png').toBuffer();
    const filepath = "user/" + filename;
    minioClient.putObject("cooknow", filepath, img, function (error, etag) {
        if (error) {
            return console.log(error);
        }
    });

    const user = Object.assign({
        _id: id,
        email: req.body.email,
        password: req.body.password,
        isChef: true,
        verificationToken: '',
        isAuthenticated: true,
        title: req.body.title,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        streetname: req.body.streetname,
        houseNumber: req.body.houseNumber,
        zipCode: req.body.zipCode,
        city: req.body.city,
        country: req.body.country,
        userImage: filepath,
        courseInstances: [],
        restaurantName: req.body.restaurantName,
        homepage: req.body.homepage,
        courses: []
    }, {password: bcrypt.hashSync(req.body.password, 8)});
    try {
        let retUser = await UserModel.create(user);

        // if user is registered without errors
        // create a token
        const token = jwt.sign({id: retUser._id, email: retUser.email}, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({token: token});
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                error: 'User exists',
                message: err.message
            });
        } else {
            return res.status(500).json({
                error: 'Internal server error',
                message: err.message
            });
        }
    }
};

const logout = (req, res) => {
    res.status(200).send({token: null});
};


module.exports = {
    login,
    registerCustomer,
    registerChef,
    logout,
};