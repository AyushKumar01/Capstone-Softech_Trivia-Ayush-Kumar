const bookshelf = require("../bookshelf");

const Question = bookshelf.model("question", {
  tableName: "question"
});

module.exports = Question;