const { Schema, model } = require('mongoose');

const InputSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = model('Input', InputSchema);