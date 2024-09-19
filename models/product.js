const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Required name'],
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    description: { type: String },
    available: { type: Boolean, default: true },
    size: { type: String },
});

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.id = _id;
    return product;
}

module.exports = model('Product', ProductSchema);