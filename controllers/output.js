const Output = require('../models/output');
const { response } = require('express');
const { CONTACT_ADMINISTRATOR } = require('../constants/general');

const getOutput = async(req, res = response) => {
    const outputs = await Output.find();
    res.json({
        ok: true,
        msg: outputs
    });
}

const createOutput = async(req, res) => {
    try {
        const output = new Output(req.body);
        await output.save();
        res.json({
            ok: true,
            output
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR
        });
    }
}

const updateOutput = async(req, res = response) => {
    const { id } = req.params;
    try {
        const output = await Output.findById(id);
        if(!output){
            return res.status(404).json({
                ok: false,
                msg: 'Output not found'
            });
        }
        const { ...fields } = req.body;
        const updateOutput = await Output.findByIdAndUpdate(id, fields);
        res.json({
            ok: true,
            output: updateOutput
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: CONTACT_ADMINISTRATOR
        });
    }
}

const deleteOutput = async(req, res = response) => {
    const { id } = req.params;
    try {
        const output = await Output.findById(id);
        if(!output){
            return res.status(404).json({
                ok: false,
                msg: 'Output not found'
            });
        }
        await Output.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Output deleted'
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
    getOutput,
    createOutput,
    updateOutput,
    deleteOutput
}
