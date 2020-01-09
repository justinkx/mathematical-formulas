const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');


router.get('/categories', getCategory);
function getCategory(req, res, next) {
    categoryService.getCategories()
    .then(categories => res.json(categories))
    .catch(error=> next(error))
}


module.exports = router;