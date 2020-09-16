const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel");
const bookshelf = require("../bookshelf");
const jwt = require('jsonwebtoken');
const { request } = require("express");

require('dotenv').config();
const { JWT_SECRET } = process.env;

router
  .route("/")
  .get((req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];;
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if(err){
        return res.json({
          error: err,
        });
      }else{
        if(req.query.count){
          count = req.query.count;
          bookshelf.knex('comment').orderBy('comment_at', 'DESC').limit(count).then(function(rvw) {
            res.json({ status: 200, comment : rvw });
          }).catch(() => {
            res.status(400).json({ error: 'unable to fetch comments' });
          });
        }else{
          bookshelf.knex('comment').orderBy('comment_at', 'DESC').then(function(rvw) {
            res.json({ status: 200, comment : rvw });
          }).catch(() => {
            res.status(400).json({ error: 'unable to fetch comments' });
          });
        }
        // Comment.fetchAll().limit(1).then((rvw) => {
        //   res.json({ status: 200, comment : rvw });
        //})
      }
    });
  })
  .post((req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];;
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if(err){
        return res.json({
          error: err,
        });
      }else{       
        const { username, comment, userId } = req.body;
        if (!username || !comment) {
          return res.status(400).send({
          error: 'POST body must contain all requiredProperties',
          requiredProperties: ['username', 'comment']
          });
        }
        new Comment({
          username: username,
          comment: comment,
          userId : userId
        })
        .save()
        .then((newComment) => {
            res.status(200).json({ newComment });
        }).catch(() => {
          res.status(400).json({ error: 'unable to save comments' });
        });
      }
    });
  });

module.exports = router;