const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Login = require("../models/login");
const { route } = require("./categoryRoutes");
require('dotenv').config();
const { JWT_SECRET } = process.env;

router
  .route("/")
  .post((req, res) => {
    const { username, password } = req.body;
    Login.where({username: username, password: password})
    .fetch()
    .then((

    ) => {
      const token = jwt.sign({ username }, JWT_SECRET, {
            expiresIn: '30min',
          });
        res.json({ status: 200, token });
    }).catch(() => {res.status(200).json({ error: 'user details are invalid' });
  });
});
  
router
  .route("/signup")
  .post((req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    new Login({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password
    })
    .save()
    .then((newSignUp) => {
        res.status(201).json({ newSignUp });
      });
  });

module.exports = router;
