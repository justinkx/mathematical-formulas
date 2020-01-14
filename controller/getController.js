const express = require("express");
const router = express.Router();
const categoryService = require("../services/categoryService");
const topicService = require("../services/topicService");
const generator = require('../quotes/randomQuoteGenerator');
const equationService = require('../services/equationServices');
const mathJax = require('../services/mathjaxService');


router.get("/categories", getCategory);
router.get("/topics/:categoryId", getTopics);
router.get("/equations/:topicId", getEquations);
router.get('/svg/',generateSvgFromLatex);

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
  .then(async collection => {
    const equations = [];
    for(let eq of collection ) {
      eq = eq.toObject();
      const svg = await mathJax.generateSvg(JSON.parse(eq.latex));
      equations.push({...eq,svg: svg});
    }
    res.json(equations);
  })
  .catch(error => next(error));
}
function generateSvgFromLatex(req,res,next) {
  const latex = req.query.latex;
  mathJax.generateSvg(latex)
  .then((svg)=> {
    res.json(svg)
  })
  .catch(error => next(error));
}
module.exports = router;
