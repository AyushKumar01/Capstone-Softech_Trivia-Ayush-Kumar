const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel");
const bookshelf = require("../bookshelf");
const verifyToken = require("../routes/commonFunction");

//api to get top(n) comments by descending comment_at order; based on count  
router
  .route("/")
  .get(verifyToken, (req, res) => { 
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
  })
  //api to save comment request by user
  .post(verifyToken, (req, res) => {       
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
  });

module.exports = router;