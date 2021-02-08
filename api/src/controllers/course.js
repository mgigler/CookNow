const UserModel = require('../models/user');
const CourseModel = require('../models/course');
const RatingModel = require('../models/rating');
const OrderModel = require('../models/order');
const mongoose = require('mongoose');
const sharp = require('sharp');
const minioClient = require('../minio').minioClient;
const CategoryModel = require('../models/category');
const moment = require('moment');
const moment_tz = require('moment-timezone');
const jwtDecode = require('jwt-decode');

const create = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });

        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)

        if (decoded.isChef) {
            const id = mongoose.Types.ObjectId();
            const filename = id + ".jpg";
            const img_small = await sharp(req.file.buffer).resize(450, 450).toFormat('png').toBuffer();
            const img_normal = await sharp(req.file.buffer).resize(3000, 3000).toFormat('png').toBuffer();


            minioClient.putObject("cooknow", "smallImages/" + filename, img_small, function (error, etag) {
                if (error) {
                    return console.log(error);
                }
            });

            minioClient.putObject("cooknow", "normalImages/" + filename, img_normal, function (error, etag) {
                if (error) {
                    return console.log(error);
                }
            });
            //Load Category names from request
            const req_categories = JSON.parse(req.body.categories);
            //Load all categories from database
            const categories = await CategoryModel.find({}).exec();

            let filtered_categories = [];
            //if the category from the request exists in the database, then add the id of the category to the filtered_categories array
            categories.map((v) => req_categories.indexOf(v.name) >= 0 ? filtered_categories.push(mongoose.Types.ObjectId(v._id)) : null);

            const course = Object.assign({
                _id: id,
                title: req.body.title,
                description: req.body.description,
                dishes: JSON.parse(req.body.dishes),
                ingredients: JSON.parse(req.body.ingredients),
                equipment: JSON.parse(req.body.equipment),
                cost: req.body.cost,
                maxParticipants: req.body.maxParticipants,
                categories: filtered_categories,
                courseImage: filename,
                ratings: [],
                instances: JSON.parse(req.body.instances)
            });

            const savedCourse = await CourseModel.create(course);
            //Update UserModel and add CourseId to Chef
            await UserModel.findByIdAndUpdate(decoded.id, {"$push": {"courseIDs": mongoose.Types.ObjectId(savedCourse._id)}}, {
                new: true,
                runValidators: true
            }).exec();

            res.status(201).json(savedCourse);
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

const update = async (req, res) => {
        try {

            if (Object.keys(req.body).length === 0) return res.status(400).json({
                error: 'Bad Request',
                message: 'The request body is empty'
            });
            const token = req.headers.authorization.substring(4)
            const decoded = jwtDecode(token)

            if (decoded.isChef) {
                const filename = req.params.id + ".jpg";

                if (req.file) {

                    const img_small = await sharp(req.file.buffer).resize(450, 450).toFormat('png').toBuffer();
                    const img_normal = await sharp(req.file.buffer).resize(3000, 3000).toFormat('png').toBuffer();

                    minioClient.putObject("cooknow", "smallImages/" + filename, img_small, function (error, etag) {
                        if (error) {
                            return console.log(error);
                        }
                    });

                    minioClient.putObject("cooknow", "normalImages/" + filename, img_normal, function (error, etag) {
                        if (error) {
                            return console.log(error);
                        }
                    });
                }
                //Load Category names from request
                const req_categories = JSON.parse(req.body.categories);
                //Load all categories from database
                const categories = await CategoryModel.find({}).exec();

                let filtered_categories = [];
                //if the category from the request exists in the database, then add the id of the category to the filtered_categories array
                categories.map((v) => req_categories.indexOf(v.name) >= 0 ? filtered_categories.push(mongoose.Types.ObjectId(v._id)) : null);
                const org_course = await CourseModel.findById(req.params.id).exec();
                const new_instanes = JSON.parse(req.body.instances);
                let adj_instances = []
                if (org_course.instances.length < new_instanes.length) {
                    adj_instances = org_course.instances.concat(new_instanes.slice(org_course.instances.length))
                } else {
                    adj_instances = org_course.instances
                }
                let course = {};
                course.title = req.body.title;
                course.description = req.body.description;
                course.dishes = JSON.parse(req.body.dishes);
                course.ingredients = JSON.parse(req.body.ingredients);
                course.equipment = JSON.parse(req.body.equipment);
                course.cost = req.body.cost;
                course.maxParticipants = req.body.maxParticipants;
                course.categories = filtered_categories;
                course.courseImage = filename;
                course.instances = adj_instances;


                const updatedCourse = await CourseModel.findByIdAndUpdate(req.params.id, course, {
                    new: true,
                    runValidators: true
                }).exec();

                res.status(200).json(updatedCourse);
            } else {
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'The user is not authorized'
                });
            }
        } catch
            (err) {
            console.log(err)
            res.status(500).send({
                error: 'Internal server error',
                message: err.message
            });
        }
    }
;


const getSingle = async (req, res) => {
    try {
        let course = await CourseModel.findById(req.params.id).exec();
        if (!course) return res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
        });
        course.courseImage = process.env.MINIO_URL + "/normalImages/" + course.courseImage;
        const categories = await CategoryModel.find({}).exec();
        // convert course (of type CourseModel) into an raw json object in order to convert the category id's into category names
        const tmp = JSON.parse(JSON.stringify(course));
        tmp.categories = []

        //convert category_ids into category names
        categories.map((v) => course.categories.indexOf(v._id) >= 0 ? tmp.categories.push(v.name) : null);
        return res.status(200).json(tmp);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const getInstance = async (req, res) => {
    try {
        let course = await CourseModel.findOne({"instances._id": req.params.instanceId})
        let chef = await UserModel.findOne({"courseIDs": course._id})
        let instances = course.instances

        let instance = {}
        instance.chefFirstName = chef.firstName
        instance.chefLastName = chef.lastName
        instance.restaurantImage = chef.restaurantImage
        instance.restaurantName = chef.restaurantName
        instance.homepage = chef.homepage
        instance.userImage = process.env.MINIO_URL + "/" + chef.userImage;

        instance.courseId = course.id
        instance.courseTitle = course.title
        instance.description = course.description
        //instance.chefName = course.chefName
        instance.cost = course.cost
        instance.dishes = course.dishes
        instance.ratings = course.ratings
        instance.ingredients = course.ingredients
        instance.equipment = course.equipment
        instance.courseImage = process.env.MINIO_URL + "/normalImages/" + course.courseImage;
        instance.maxParticipants = course.maxParticipants

        instances.map(function (val) {
            if (val._id == req.params.instanceId) {
                instance.instanceId = val._id;
                instance.startDate = val.startDate;
                instance.endDate = val.endDate;
                instance.bookable = val.bookable;
            }
        })
        if (!instances) return res.status(404).json({
            error: 'Not Found',
            message: `Courseinstance not found`
        });
        return res.status(200).json(instance);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const getIngredients = async (req, res) => {
    try {
        let course = await CourseModel.findOne({"instances._id": req.params.id}).exec();
        let ingredients = course.ingredients;
        let result = [];
        let orders = await OrderModel.find({courseInstancesId: mongoose.Types.ObjectId(req.params.id)}).exec();
        let sumIngredients = [];
        ingredients.map(function (val, index) {
            let item = {};
            item.ingredient = val.ingredient;
            item.unit = val.unit;
            item.amount = 0;
            sumIngredients.push(item)
        })
        orders.map(function (val, index) {
            let item = {};
            item.ingredients = {}
            item.user = val;
            let temp = [];
            ingredients.map(function (val, index) {
                let ingredient = {};
                ingredient.ingredient = val.ingredient;
                ingredient.unit = val.unit;
                ingredient.amount = val.amount * item.user.portions;
                sumIngredients[index].amount += ingredient.amount
                temp.push(ingredient);
            })
            item.ingredients = temp
            result.push(item);
        })
        result.push(sumIngredients)

        if (!course) return res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
        });
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


const getUserCourses = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        let orders = await OrderModel.find({"userId": decoded.id}).exec();
        let rs = [];
        let temp = await orders.map(async (val) => {
            let course = await CourseModel.findOne({"instances._id": mongoose.Types.ObjectId(val.courseInstancesId)}).exec();
            let result = {}
            result.courseId = course.id
            result.courseTitle = course.title
            result.description = course.description
            result.chefName = course.chefName
            result.cost = course.cost
            result.dishes = course.dishes
            result.ratings = course.ratings
            result.ingredients = course.ingredients
            result.equipment = course.equipment
            result.courseImage = process.env.MINIO_URL + "/normalImages/" + course.courseImage;
            result.maxParticipants = course.maxParticipants
            course.instances.map(function (i) {
                if (String(i._id) == String(val.courseInstancesId)) {
                    result.instanceId = i._id;
                    result.startDate = i.startDate;
                    result.endDate = i.endDate;
                }
            })
            return result
        })

        if (!orders) return res.status(404).json({
            error: 'Not Found',
            message: `Course not found`
        });
        Promise.all(temp).then(e => {
            return res.status(200).json((e))
        })
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const isUserCourse = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        let bool = await OrderModel.findOne({
            "courseInstancesId": mongoose.Types.ObjectId(req.params.instanceId),
            "userId": decoded.id
        })

        if (!bool) return res.status(200).json(false);
        return res.status(200).json(true);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const getChefCourses = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        let chef = await UserModel.findOne({"_id": decoded.id, "isChef": true}).exec();
        let courseIDs = chef.courseIDs
        let courses = await courseIDs.map(async (val) => {
            let course = await CourseModel.findOne({"_id": val}).exec();
            let rslt = []
            course.instances.map(function (i, index) {
                let result = {}
                result.courseId = course.id
                result.courseTitle = course.title
                result.description = course.description
                result.chefName = course.chefName
                result.cost = course.cost
                result.dishes = course.dishes
                result.ratings = course.ratings
                result.ingredients = course.ingredients
                result.equipment = course.equipment
                result.courseImage = process.env.MINIO_URL + "/normalImages/" + course.courseImage;
                result.maxParticipants = course.maxParticipants

                result.instanceId = i._id;
                result.startDate = i.startDate;
                result.endDate = i.endDate;
                rslt.push(result)

            })
            return rslt

        })

        if (!courseIDs) return res.status(404).json({
            error: 'Not Found',
            message: `CourseIDs not found`
        });
        Promise.all(courses).then(e => {
            return res.status(200).json([].concat.apply([], e))
        })
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


const isChefCourse = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        let chefcourse = await UserModel.findOne({
            "isChef": true,
            "_id": decoded.id,
            "courseIDs": req.params.courseId
        })

        if (!chefcourse) return res.status(200).json(false);
        return res.status(200).json(true);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async (req, res) => {
    try {
        let filter_query = {};
        //add Search filter (filter courses by title)
        if (req.query.search !== undefined && req.query.search.length > 0) {
            filter_query["title"] = {$regex: new RegExp(req.query.search, "i")}
        }

        // add Category filters
        if (req.query.categories !== undefined && req.query.categories.length > 0) {
            let categories = await CategoryModel.find({}).exec();
            const req_categories = req.query.categories.split(",");
            let filtered_categories = [];
            categories.map((v) => req_categories.indexOf(v.name) >= 0 ? filtered_categories.push(mongoose.Types.ObjectId(v._id)) : null);
            //add filter to filter query, if a valid filter exists
            filtered_categories.length > 0 ? filter_query["categories"] = {$all: filtered_categories} : null;
        }

        // add min and max filters
        if (req.query.minPrice !== undefined && req.query.minPrice.length > 0 && req.query.maxPrice !== undefined && req.query.maxPrice.length > 0) {
            filter_query["cost"] = {$gte: parseFloat(req.query.minPrice), $lte: parseFloat(req.query.maxPrice)}
        }

        //add Date filter
        const date = moment(req.query.date, "YYYY-MM-DD").format("YYYY-MM-DD")
        const next_date = moment(date, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD")
        if (date !== 'Invalid date') {
            filter_query["instances.startDate"] = {$gte: new Date(date), $lt: new Date(next_date)}
        }
        let courses = await CourseModel.aggregate([
            {
                $match: filter_query,

            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "courseIDs",
                    as: "chef"
                }
            }, {
                $project: {
                    "title": 1,
                    "courseImage": 1,
                    "cost": 1,
                    "instances": 1,
                    "chef": {$arrayElemAt: ["$chef", 0]}
                }
            }, {
                $project: {
                    "title": 1,
                    "courseImage": 1,
                    "cost": 1,
                    "instances": 1,
                    "chefName": {$concat: ["$chef.firstName", " ", "$chef.lastName"]}
                }
            }
        ]).exec();


        let tmp = [];
        const currentTime = moment_tz().tz('Europe/Berlin').format();

        courses.map(course => {
            course.instances.map(instance => {
                    if (date === 'Invalid date' && moment(instance.startDate).diff(currentTime, 'minutes') > 0 && instance.bookable) {
                        tmp.push({
                            "_id": course._id,
                            "instance_id": instance._id,
                            "title": course.title,
                            "chefName": course.chefName,
                            "courseImage": process.env.MINIO_URL + "/smallImages/" + course.courseImage,
                            "cost": course.cost,
                            "startDate": instance.startDate
                        });
                    } else if (moment(instance.startDate).format("YYYY-MM-DD") === date && moment(instance.startDate).diff(currentTime, 'minutes') > 0 && instance.bookable) {
                        tmp.push({
                            "_id": course._id,
                            "instance_id": instance._id,
                            "title": course.title,
                            "chefName": course.chefName,
                            "courseImage": process.env.MINIO_URL + "/smallImages/" + course.courseImage,
                            "cost": course.cost,
                            "startDate": instance.startDate
                        });
                    }
                }
            )
        });

        //sort array by date
        tmp.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

        return res.status(200).json(tmp);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


const listCourseTitles = async (req, res) => {
    try {
        let courses = [];
        if (req.query.search === undefined || req.query.search.length <= 2) {
            return res.status(200).json([]);
        }
        courses = await CourseModel.find({title: {$regex: new RegExp(req.query.search, "i")}}, {
            title: 1,
            instances: 1
        }).exec();

        let tmp = [];
        const currentTime = moment_tz().tz('Europe/Berlin').format();

        courses.map(course => {
            course.instances.map(instance => {
                    if (moment(instance.startDate).diff(currentTime, 'minutes') > 0 && instance.bookable === true) {
                        tmp.push(course.title);
                    }
                }
            )
        });
        tmp = tmp.filter(onlyUnique);
        return res.status(200).json(tmp);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


const addRating = async (req, res) => {
    const currentTime = moment_tz().tz('Europe/Berlin').format();

    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        const isParticipant = await OrderModel.findOne({
            "courseInstancesId": mongoose.Types.ObjectId(req.body.instanceId),
            "userId": decoded.id
        })
        const course = await CourseModel.findOne({"instances._id": req.body.instanceId})
        const instances = course.instances
        let instance = {};
        instances.map(function (val) {
            if (val._id == req.body.instanceId) {
                instance.instanceId = val._id;
                instance.startDate = val.startDate;
                instance.endDate = val.endDate;
            }
        })
        // rating only if user is no chef, has participated in the course and the course has already taken place
        if (!decoded.isChef && isParticipant && (moment(instance.endDate).diff(currentTime, 'minutes') < 0)) {
            const newRating = new RatingModel({
                userId: decoded.id,
                firstName: decoded.firstName,
                rating: req.body.rating,
                title: req.body.title,
                description: req.body.description
            })

            const updatedCourse = await CourseModel.findByIdAndUpdate(req.params.id, {"$push": {"ratings": newRating}}, {
                new: true,
                runValidators: true
            }).exec();

            res.status(200).json(updatedCourse);
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
}

const removeRating = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        const course = await CourseModel.findOne({"_id": req.params.id})
        const ratings = course.ratings
        let rating = {};
        ratings.map(function (val) {
            if (val._id == req.body.ratingId) {
                rating._id = val._id;
                rating.userId = val.userId;
            }
        })

        if (rating.userId == decoded.id) {
            const deleteRating = await CourseModel.findByIdAndUpdate(req.params.id, {
                "$pull": {"ratings": {_id: req.body.ratingId}}
            }).exec();
            await RatingModel.findByIdAndRemove(req.body.ratingId).exec();

            res.status(200).json(deleteRating);
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
}

const updateRating = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        const course = await CourseModel.findOne({"_id": req.params.id})

        course.ratings.map(function (val) {
            if (val._id == req.body.ratingId) {

                if (val.userId != decoded.id) {
                    return res.status(401).json({
                        error: 'Unauthorized',
                        message: 'The user is not authorized'
                    });
                }

                val.rating = req.body.rating;
                val.title = req.body.title;
                val.description = req.body.description;
                return val;
            }
        })
        course.save();
        return res.status(200).json(course);

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: 'Internal server error',
            message: err.message
        });
    }
}


const remove = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(4)
        const decoded = jwtDecode(token)
        let successful = undefined;
        await UserModel.updateOne({_id: decoded.id}, {$pull: {'courseIDs': mongoose.Types.ObjectId(req.params.id)}}, function (err, result) {
            console.log("error", err);
            successful = result.nModified === 1;
            return result;
        });

        if (!successful) {
            return res.status(401).json({message: `Unauthorized`})
        }
        await CourseModel.deleteOne({_id: req.params.id}, function (err, res) {
            if (err) {
                console.log(err);
            }
        });
        minioClient.removeObject("cooknow", "smallImages/" + req.params.id + ".jpg", function (error, etag) {
            if (error) {
                return console.log(error);
            }
        });

        minioClient.removeObject("cooknow", "normalImages/" + req.params.id + ".jpg", function (error, etag) {
            if (error) {
                return console.log(error);
            }
        });
        return res.status(200).json({message: `Course with id${req.params.id} was deleted`});
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = {
    create,
    update,
    list,
    getSingle,
    getInstance,
    addRating,
    removeRating,
    remove,
    getIngredients,
    getUserCourses,
    getChefCourses,
    isUserCourse,
    isChefCourse,
    listCourseTitles,
    updateRating
};