/*
 Route: /api/products
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate_fields');
const { 
    REQUIRED_NAME,
    REQUIRED_CATEGORY_ID,
    NAME,
    CATEGORY
} = require('../constants/general');
const { 
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');

const router = Router();

router.get('/', getProducts);
router.post(
    '/',
    [
        check(NAME, REQUIRED_NAME).not().isEmpty(),
        check(CATEGORY, REQUIRED_CATEGORY_ID).isMongoId(),
        validateFields
    ],
    createProduct
);
router.put(
    '/:id',
    [
        check(NAME, REQUIRED_NAME).not().isEmpty(),
        check(CATEGORY, REQUIRED_CATEGORY_ID).isMongoId(),
        validateFields
    ],
    updateProduct
);
router.delete('/:id', deleteProduct);

module.exports = router;