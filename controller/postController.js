const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');
const topicService = require('../services/topicService');
const equationService = require('../services/equationServices');
const multer = require('multer');
const upload = multer();

router.post('/categories', createCategory);
router.put('/categories/:categoryId',updateCategory);
router.delete('/categories/:categoryId',deleteCategory);
router.post('/topics', createTopic);
router.put('/topics/:topicId', updateTopic);
router.delete('/topics/:topicId',deleteTopic);
router.post('/equations',upload.none(), createEquation);
router.put('/equations/:equationId', updateEquation);
router.delete('/equations/:equationId', deleteEquation);

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
function deleteCategory(req,res, next) {
  categoryService.deleteCategory(req.params.categoryId)
  .then(resp => res.json(resp))
  .catch(err=> next(err))
}
function createTopic(req,res, next) {
  topicService.createTopic(req.body)
  .then(topic => res.json(topic))
  .catch(error => next(error))
}
function updateTopic(req, res, next) {
  topicService.updateTopic(req.params.topicId,req.body)
  .then(resp => res.json(resp))
  .catch(err=> next(err))
}
function deleteTopic(req, res, next) {
  topicService.deleteTopic(req.params.topicId)
  .then(resp => res.json(resp))
  .catch(err=> next(err))
}
function createEquation(req,res,next) {
  equationService.createEquation(req.body)
  .then(equation=> res.json(equation))
  .catch(error => next(error));
}
function updateEquation(req,res, next) {
  equationService.updateEquation(req.params.equationId,req.body)
  .then(equation => res.json(equation))
  .catch(error => next(error));
}
function deleteEquation(req,res,next) {
  equationService.deleteEquation(req.params.equationId)
  .then(resp => res.json(resp))
  .catch(err => next(err));
}
module.exports = router;