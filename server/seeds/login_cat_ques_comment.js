
const loginData = require("../seed_data/login");
const categoryData = require("../seed_data/category");
const questionData = require("../seed_data/question");
const commentData = require("../seed_data/comment");
exports.seed = function(knex) {
  // Deletes ALL existing entries [return knex("login")]
  return knex("login")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("login").insert(loginData);
    })
    .then(() => {
      return knex("category").del();
    })
    .then(function() {
      // Inserts seed entries
      return knex("category").insert(categoryData);
    })
    .then(() => {
      return knex("question").del();
    })
    .then(function() {
      // Inserts seed entries
      return knex("question").insert(questionData);
    })
    .then(() => {
      return knex("comment").del();
    })
    .then(function() {
      // Inserts seed entries
      return knex("comment").insert(commentData);
    })
};
