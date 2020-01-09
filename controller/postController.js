const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');

router.post('/categories', createCategory)
function createCategory(req, res, next) {
    categoryService.createCategory(req.body)
  .then(categories => {res.json(categories)})
  .catch(error => {next(error)});
}

module.exports = router;