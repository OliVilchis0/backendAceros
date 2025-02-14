const Category = require('../models/category');
const { response } = require('express');
const { CONTACT_ADMINISTRATOR } = require('../constants/general');

const getCategory = async (req, res) => {
    const category = await Category.find();
    res.json({
        ok: true,
        msg: category
    });
}

const getCategoryById = async (req, res = response) => {
    const { id } = req.params;
    try{
        const category = await Category.findById(id);
        if (!category){
            return res.status( 404 ).json({
                ok: false,
                msg: 'Category ID not found'
            });
        }
        res.json({
            ok: true,
            category: category
        });
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR 
        });
    }
}

const createCategory = async (req, res = response) => {
    const { name, description } = req.body;
    try {
        const category = new Category( req.body );
        await category.save();
        res.json({
            ok: true,
            category
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR 
        });
    }
}

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({
                ok: false,
                msg: 'Category not found'
            });
        }
        const { ...fields } = req.body;
        const updateCategory = await Category.findByIdAndUpdate(id, fields);
        res.json({
            ok: true,
            category: updateCategory
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR 
        });
    }
}

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({
                ok: false,
                msg: 'Category not found'
            });
        }
        await Category.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Category deleted'
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
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}