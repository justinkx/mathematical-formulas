const express = require("express");
const router = express.Router();
const categoryService = require("../services/categoryService");
const topicService = require("../services/topicService");
const generator = require('../quotes/randomQuoteGenerator');
const equationService = require('../services/equationServices');

router.get("/categories", getCategory);
router.get("/topics/:categoryId", getTopics);
router.get("/equations/:topicId", getEquations);

function getCategory(req, res, next) {
  categoryService.getCategories()
  .then(collection => {
      const categories = [];
      collection.forEach(category => {
          category = category.toObject();
          const quote = generator.generateQuote(category.name);
          if (quote) {
            category.quote;
          }
          categories.push(category)
      });
      res.json(categories);
  })
  .catch(error => next(error));
}

function getTopics(req, res, next) {
  topicService
    .getTopics(req.params.categoryId)
    .then(collection => {
      const topics = [];
      collection.forEach(topic => {
          topic = topic.toObject();
          const quote = generator.generateQuote(topic.name);
          if (quote){
            topic.quote = quote;
          }
          topics.push(topic)
      });
      res.json(topics);
  })
    .catch(error => next(error));
}

function getEquations(req,res, next) {
  equationService.getEquations(req.params.topicId)
  .then(collection => {
    res.json(collection);
  })
  .catch(error => next(error));
}
module.exports = router;
