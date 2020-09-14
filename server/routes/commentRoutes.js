const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel");
const bookshelf = require("../bookshelf");
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { JWT_SECRET } = process.env;

router
  .route("/")
  .get((_req, res) => {
    const token = _req.headers.authorization;
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if(err){
        return res.json({
          error: err,
        });
      }else{
        bookshelf.knex('comment').orderBy('comment_at', 'DESC').limit(2).then(function(rvw) {
          res.json({ status: 200, comment : rvw });
        })
        // Comment.fetchAll().limit(1).then((rvw) => {
        //   res.json({ status: 200, comment : rvw });
        //})
        .catch(() => {
          res.status(400).json({ error: 'unable to fetch comments' });
        });
      }
    });
  })
  .post((req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if(err){
        return res.json({
          error: err,
        });
      }else{       
        const { username, comment } = req.body;
        if (!username || !comment) {
          return res.status(400).send({
          error: 'POST body must contain all requiredProperties',
          requiredProperties: ['username', 'comment']
          });
        }
        new Comment({
          username: username,
          comment: comment
        })
        .save()
        .then((newComment) => {
            res.status(200).json({ newComment });
        }).catch(() => {
          res.status(400).json({ error: 'unable to fetch comments' });
        });
      }
    });
  });

module.exports = router;