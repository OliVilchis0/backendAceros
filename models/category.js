const { Schema, model } = require('mongoose');
const { REQUIRED_NAME } = require('../constants/general');

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, REQUIRED_NAME],
        unique: true
    },
    description: { type: String },
});

categorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.id = _id;
    return category;
}

module.exports = model('Category', categorySchema);