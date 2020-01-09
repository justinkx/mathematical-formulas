const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');

router.post('/categories', createCategory);
router.post('/categories/:categoryId',updateCategory);
function createCategory(req, res, next) {
    categoryService.createCategory(req.body)
  .then(categories => {res.json(categories)})
  .catch(error => {next(error)});
}
function updateCategory(req,res, next) {
  categoryService.updateCategory(req.params.categoryId,req.body)
  .then(category => {res.json(category)})
  .catch(error => {next(error)});
}

module.exports = router;