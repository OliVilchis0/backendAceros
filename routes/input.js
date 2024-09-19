/*
    Route: /api/input
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate_fields');
const { 
    PRODUCT,
    REQUIRED_PRODUCT_ID
} = require('../constants/general');
const {
    getInput,
    createInput,
    updateInput,
    deleteInput
} = require('../controllers/input');

const router = Router();

router.get('/', getInput);
router.post(
    '/',
    [
        check(PRODUCT, REQUIRED_PRODUCT_ID).isMongoId(),
        validateFields
    ],
    createInput
);
router.put(
    '/:id',
    [
        check(PRODUCT, REQUIRED_PRODUCT_ID).isMongoId(),
        validateFields
    ],
    updateInput
);
router.delete('/:id', deleteInput);

module.exports = router;