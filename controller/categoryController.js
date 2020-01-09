const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');


router.get('/', getCategory);
router.post('/create', createCategory);
function getCategory(req, res, next) {
    categoryService.getCategories()
    .then(categories => res.json(categories))
    .catch(error=> next(error))
}

function createCategory(req, res, next) {
    categoryService.createCategory(req.body)
  .then(categories => {res.json(categories)})
  .catch(error => {next(error)});
}
module.exports = router;