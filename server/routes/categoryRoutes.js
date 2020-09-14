const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Question = require("../models/questionModel");
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { JWT_SECRET } = process.env;

router
  .route("/")
  .get((req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if(err){
        return res.json({
          error: err,
        });
      }else{
        Category.fetchAll().then((cat) => {
          res.json({ status: 200, category : cat });
        }).catch(() => {res.status(400).json({ error: 'unable to fetch categories' });});  
      }
    });
  });

router
.route("/:id")
.get((req, res) => {
  // if (!req.params.id) {
  //   return res.status(400).send({
  //   error: 'GET request must contain all requiredProperties',
  //   requiredProperties: ['id']
  //   });
  // }
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if(err){
        return res.json({
          error: err,
        });
      }else{         
        Question.where({categoryId: req.params.id})
        .fetchAll()
        .then((question) => {
          res.status(200).json({questions : question});
        }).catch((error) => { 
          res.status(400).json({ error: 'unable to fetch questions' });
        });  
      }
    });
})

module.exports = router;