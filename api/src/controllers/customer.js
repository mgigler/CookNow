const User = require('../models/user')
const Order = require('../models/order')
const jwtDecode = require('jwt-decode');
const mongoose = require('mongoose');
const CourseModel = require('../models/course');

const update = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    const token = req.headers.authorization.substring(4)
    const decoded = jwtDecode(token)
    const id = decoded.id
    let userOld = await User.findById(id).exec();
    let user = {};
    //user.email = userOld.email;
    if (req.body.title.length > 250 || req.body.title.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Title could not be validated'
        });
    }
    if (req.body.firstName.length > 250 || req.body.firstName.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'First Name could not be validated'
        });
    }
    if (req.body.lastName.length > 250 || req.body.lastName.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Last Name could not be validated'
        });
    }
    if (req.body.streetname.length > 250 || req.body.streetname.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Street name could not be validated'
        });
    }
    if (req.body.houseNumber < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'House number could not be validated'
        });
    }
    if (req.body.zipCode < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Zip code could not be validated'
        });
    }
    if (req.body.city.length > 250 || req.body.city.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'City could not be validated'
        });
    }
    if (req.body.country.length > 250 || req.body.country.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Country could not be validated'
        });
    }
    user.title = req.body.title;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.streetname = req.body.streetname;
    user.houseNumber = req.body.houseNumber;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.country = req.body.country;

    if (userOld.isChef) {
        user.restaurantName = req.body.restaurantName;
        user.homepage = req.body.homepage;
    }

    try {
        await User.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true
        }).exec();

        res.status(200).json({message: "user updated"})

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const order = async (req, res) => {
    const email = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    if (req.body.portions > 4 || req.body.portions < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Portions could not be validated'
        });
    }
    if (req.body.deliveryTime.length > 250 || req.body.deliveryTime.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Delivery Time could not be validated'
        });
    }
    if (req.body.paymentId.length > 250 || req.body.paymentId.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'PaymentId could not be validated'
        });
    }
    if (req.body.title.length > 250 || req.body.title.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Title could not be validated'
        });
    }
    if (req.body.firstName.length > 250 || req.body.firstName.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'First Name could not be validated'
        });
    }
    if (req.body.lastName.length > 250 || req.body.lastName.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Last Name could not be validated'
        });
    }
    if (req.body.street.length > 250 || req.body.street.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Street could not be validated'
        });
    }
    if (req.body.houseNumber < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'House Number could not be validated'
        });
    }
    if (req.body.postalCode < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Postal Code could not be validated'
        });
    }
    if (req.body.city.length > 250 || req.body.city.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'City could not be validated'
        });
    }
    if (req.body.courseInstancesId.length > 250 || req.body.courseInstancesId.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'courseInstanceId could not be validated'
        });
    }
    if (req.body.courseId.length > 250 || req.body.courseId.length < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'courseId could not be validated'
        });
    }
    if (req.body.email.length > 250 || req.body.email.length < 1 || !email.test(req.body.email)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Email could not be validated'
        });
    }
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        if (!decoded.isChef) {
            let number_of_orders = await Order.find({"courseInstancesId": mongoose.Types.ObjectId(req.body.courseInstancesId)})
            number_of_orders = number_of_orders.length

            let course = await CourseModel.findOne({"instances": {$elemMatch: {_id: mongoose.Types.ObjectId(req.body.courseInstancesId)}}});

            if (!(number_of_orders < course.maxParticipants)) {
                course.instances = course.instances.map(i => {
                    if (i._id == req.body.courseInstancesId) {
                        i.bookable = false;
                    }
                    return i;
                })
                course.save();
                return res.status(400).json({message: "Course is already booked out"});
            }

            if (number_of_orders + 1 === course.maxParticipants) {
                course.instances = course.instances.map(i => {
                    if (i._id == req.body.courseInstancesId) {
                        i.bookable = false;
                    }
                    return i;
                })
                course.save();
            }
            const order = Object.assign({

                    userId: req.body.userId,
                    portions: req.body.portions,
                    deliveryTime: req.body.deliveryTime,
                    paid: req.body.paid,
                    paymentId: req.body.paymentId,
                    email: req.body.email,
                    title: req.body.title,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    houseNumber: req.body.houseNumber,
                    streetname: req.body.street,
                    zipCode: req.body.postalCode,
                    city: req.body.city,
                    courseInstancesId: mongoose.Types.ObjectId(req.body.courseInstancesId),
                    courseId: mongoose.Types.ObjectId(req.body.courseId)

                })
            ;

            let savedOrder = await Order.create(order);
            res.status(201).json(savedOrder);
        } else {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'The user is not authorized'
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: 'Internal server error',
            message: err.message
        });

    }
};

const getSingle = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        let user = await User.findById(decoded.id).exec();
        user["password"] = "";
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User not found`
        });
        user.userImage = process.env.MINIO_URL + "/" + user.userImage;
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


module.exports = {
    //create,
    update,
    order,
    getSingle
};