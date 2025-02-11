/* 
    Route: /api/category
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate_fields');
const { 
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category');
const { REQUIRED_NAME, NAME } = require('../constants/general');

const router = Router();

router.get('/', getCategory);
router.get('/getCategoryById/:id', getCategoryById);
router.post(
    '/',
    [
        check(NAME, REQUIRED_NAME).not().isEmpty(),
        validateFields
    ],
    createCategory
);
router.put(
    '/:id',
    [
        check(NAME, REQUIRED_NAME).not().isEmpty(),
        validateFields
    ],
    updateCategory
);

router.delete('/:id', deleteCategory);

module.exports = router;