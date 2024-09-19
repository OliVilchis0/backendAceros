const Input = require('../models/input');
const { response } = require('express');
const { CONTACT_ADMINISTRATOR } = require('../constants/general');

const getInput = async(req, res) => {
    const inputs = await Input.find();
    res.json({
        ok: true,
        msg: inputs
    });
}

const createInput = async(req, res = response) => {
    try {
        const input = new Input(req.body);
        await input.save();
        res.json({
            ok: true,
            input
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR
        });
    }
}

const updateInput = async(req, res = response) => {
    const { id } = req.params;
    try {
        const input = await Input.findById(id);
        if(!input){
            return res.status(404).json({
                ok: false,
                msg: 'Input not found'
            });
        }
        const { ...fields } = req.body;
        const updateInput = await Input.findByIdAndUpdate(id, fields);
        res.json({
            ok: true,
            input: updateInput
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR
        });
    }
}

const deleteInput = async(req, res = response) => {
    const { id } = req.params;
    try {
        const input = await Input.findById(id);
        if(!input){
            return res.status(404).json({
                ok: false,
                msg: 'Input not found'
            });
        }
        await Input.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Input deleted'
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
    getInput,
    createInput,
    updateInput,
    deleteInput
}