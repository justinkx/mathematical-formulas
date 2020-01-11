const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');
const topicService = require('../services/topicService');
const equationService = require('../services/equationServices');
const multer = require('multer');
const upload = multer();
const jwt = require('jsonwebtoken');
const config = require('../_helpers/config.json');

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
   const uid = getUserId(req);
    categoryService.createCategory(req.body,uid)
  .then(categories => {res.json(categories)})
  .catch(error => {next(error)});
}
function updateCategory(req,res, next) {
  const uid = getUserId(req);
  categoryService.updateCategory(req.params.categoryId,req.body,uid)
  .then(category => {res.json(category)})
  .catch(error => {next(error)});
}
function deleteCategory(req,res, next) {
  const uid = getUserId(req);
  categoryService.deleteCategory(req.params.categoryId,uid)
  .then(resp => res.json(resp))
  .catch(err=> next(err))
}
function createTopic(req,res, next) {
  const uid = getUserId(req);
  topicService.createTopic(req.body,uid)
  .then(topic => res.json(topic))
  .catch(error => next(error))
}
function updateTopic(req, res, next) {
  const uid = getUserId(req);
  topicService.updateTopic(req.params.topicId,req.body,uid)
  .then(resp => res.json(resp))
  .catch(err=> next(err))
}
function deleteTopic(req, res, next) {
  const uid = getUserId(req);
  topicService.deleteTopic(req.params.topicId,uid)
  .then(resp => res.json(resp))
  .catch(err=> next(err))
}
function createEquation(req,res,next) {
  const uid = getUserId(req);
  equationService.createEquation(req.body,uid)
  .then(equation=> res.json(equation))
  .catch(error => next(error));
}
function updateEquation(req,res, next) {
  const uid = getUserId(req);
  equationService.updateEquation(req.params.equationId,req.body,uid)
  .then(equation => res.json(equation))
  .catch(error => next(error));
}
function deleteEquation(req,res,next) {
  const uid = getUserId(req);
  equationService.deleteEquation(req.params.equationId,uid)
  .then(resp => res.json(resp))
  .catch(err => next(err));
}
function getUserId(req) {
  const token = req.headers.authorization.split(' ')[1];
  const {sub} = jwt.verify(token, config.secret);
  return sub;
}
module.exports = router;