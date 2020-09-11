const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Login = require("../models/login");
require('dotenv').config();
const { JWT_SECRET } = process.env;

router
  .route("/")
//   .get((req, res) => {
//     Login.where(req.query)
//       .fetchAll({ withRelated: ["inventories"] })
//       .then((warehouses) => {
//         res.status(200).json(warehouses);
//       });
//   })
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
    }).catch(() => {res.status(401).json({ error: 'user details are invalid' });});
    // if (username === user.username && password === user.password) {
    //   console.log('user info matches');
    //   const token = jwt.sign({ username, likes }, JWT_SECRET, {
    //     expiresIn: '30min',

    //   });
    //   res.json({
    //     status: 200,
    //     token,
    //   });
    // } else {
    //   res.status(401).json({ error: 'user details are invalid' });
    // }
    // new Login({
    //   username: req.body.username,
    //   password: req.body.password
    // })
    //   .save()
    //   .then((newWarehouse) => {
    //     res.status(201).json({ newWarehouse });
    //   });
  });

// router
//   .route("/:id")
//   .get((req, res) => {
//     Login.where(req.params) // params: {id: '5'}
//       .fetch({ withRelated: ["inventories"] })
//       .then((warehouse) => {
//         res.status(200).json(warehouse);
//       });
//   })
//   .put((req, res) => {
//     Warehouse.where("id", req.params.id)
//       .fetch()
//       .then((warehouse) => {
//         warehouse
//           .save({
//             name: req.body.name ? req.body.name : warehouse.name,
//             position: req.body.position
//               ? req.body.position
//               : warehouse.position,
//             manager: req.body.manager ? req.body.manager : warehouse.manager,
//             address: req.body.address ? req.body.address : warehouse.address,
//             phone: req.body.phone ? req.body.phone : warehouse.phone,
//             email: req.body.email ? req.body.email : warehouse.email,
//             categories: JSON.stringify(req.body.categories)
//               ? JSON.stringify(req.body.categories)
//               : warehouse.categories,
//           })
//           .then((updatedWarehouse) => {
//             res.status(200).json({ updatedWarehouse });
//           });
//       });
//   })
//   .delete((req, res) => {
//     Warehouse.where("id", req.params.id)
//       .destroy()
//       .then((deletedWarehouse) => {
//         res.status(200).json({ deletedWarehouse });
//       });
//   });

module.exports = router;
