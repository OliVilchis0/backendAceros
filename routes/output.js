/*
    Route: /api/output
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate_fields');
const { 
    PRODUCT,
    REQUIRED_PRODUCT_ID
 } = require('../constants/general');
const { 
    getOutput,
    createOutput,
    updateOutput,
    deleteOutput
} = require('../controllers/output');

const router = Router();

router.get('/', getOutput);
router.post(
    '/',
    [
        check(PRODUCT, REQUIRED_PRODUCT_ID).isMongoId(),
        validateFields
    ],
    createOutput
);
router.put(
    '/:id',
    [
        check(PRODUCT, REQUIRED_PRODUCT_ID).isMongoId(),
        validateFields
    ],
    updateOutput
);
router.delete('/:id', deleteOutput);

module.exports = router;