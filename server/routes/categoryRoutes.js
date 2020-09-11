const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Question = require("../models/questionModel");
require('dotenv').config();

router
  .route("/")
  .get((req, res) => {
    Category.fetchAll().then((cat) => {
      res.json({ status: 200, category : cat });
    }).catch(() => {res.status(401).json({ error: 'unable to fetch categories' });});
  });

router
.route("/:id")
.get((req, res) => {
  // console.log(req.params);
  Question.where({categoryId: req.params.id}) // params: {id: '5'}
    .fetchAll()
    .then((question) => {
      // console.log(question);
      res.status(200).json({questions : question});
    }).catch((error) => { 
      // console.log(error); 
      res.status(401).json({ error: 'unable to fetch questions' });
    });
})

  module.exports = router;