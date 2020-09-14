const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Login = require("../models/login");
const bookshelf = require("../bookshelf");

// const { route } = require("./categoryRoutes");
require('dotenv').config();
const { JWT_SECRET } = process.env;

router
  .route("/")
  .post((req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({
      error: 'POST body must contain all requiredProperties',
      requiredProperties: ['username', 'password']
      });
    }
    Login.where({username: username, password: password})
    .fetch()
    .then((login) => {
      const token = jwt.sign({ username }, JWT_SECRET, {
            expiresIn: '30min',
          });
        res.json({ status: 200, result: {"token": token, "username": username, "userId": login.id }});
    }).catch(() => {res.status(400).json({ error: 'user details are invalid' });
  });
});
  
router
  .route("/signup")
  .post((req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    if (!firstName || !lastName || !email || !password || !username) {
      return res.status(400).send({
      error: 'POST body must contain all requiredProperties',
      requiredProperties: ['firstName', 'lastName', 'email', 'password', 'username']
      });
    }
    bookshelf.knex('login').where({'username': username, 'email': email}).count('id as CNT').then(function(total) {
      if(total[0].CNT > 0){
        return res.status(400).send({
          error: 'username and email already exist'
          });
      }else{
        new Login({
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password
        })
        .save()
        .then((newSignUp) => {
            res.status(200).json({  });
          }).catch(() => {res.status(400).json({ error: 'unable to signup' });
        });
      }
    });
  });

module.exports = router;
