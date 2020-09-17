const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");
const Question = require("../models/questionModel");
const verifyToken = require("../routes/commonFunction");

router
  .route("/")
  .get(verifyToken, (_req, res) => {
      Category.fetchAll().then((cat) => {
          res.json({ status: 200, category : cat });
        }).catch(() => {res.status(400).json({ error: 'unable to fetch categories' });
      });
  });

router
.route("/:id")
.get(verifyToken, (req, res) => {    
    Question.where({categoryId: req.params.id})
    .fetchAll()
    .then((question) => {
      res.status(200).json({questions : question});
    }).catch(() => { 
      res.status(400).json({ error: 'unable to fetch questions' });
    });
})

module.exports = router;