const Product = require('../models/product');
const { response } = require('express');
const { CONTACT_ADMINISTRATOR } = require('../constants/general');

const getProducts = async (req, res = response) => {
    const since = Number(req.query.since) || 0;
    const [products, total] = await Promise.all([
        Product
            .find()
            .populate('category', 'name')
            .skip(since)
            .limit(5),
        Product.countDocuments()
    ]);
    res.json({
        ok: true,
        products,
        total
    });
}

const createProduct = async (req, res = response) => {
    try {
        const product = new Product( req.body );
        await product.save();
        res.json({
            ok: true,
            product
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR 
        });
    }
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                ok: false,
                msg: 'Product not found'
            });
        }
        const { ...fields } = req.body;
        const updateProduct = await Product.findByIdAndUpdate(id, fields);
        res.json({
            ok: true,
            product: updateProduct
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR 
        });
    }
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                ok: false,
                msg: 'Product not found'
            });
        }
        await Product.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Product deleted'
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR 
        });
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}