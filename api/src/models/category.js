const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {type: String, required: true, maxlength: 50},
});

module.exports = mongoose.model('Category', CategorySchema);
