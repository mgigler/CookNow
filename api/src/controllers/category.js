const CategoryModel = require('../models/category');


const list = async (req, res) => {
    try {
        let categories = await CategoryModel.find({}).exec();
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


module.exports = {
    list
};