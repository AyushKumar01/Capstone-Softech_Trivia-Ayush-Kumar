const bookshelf = require("../bookshelf");

const Comment = bookshelf.model("comment", {
  tableName: "comment"
});

module.exports = Comment;
// module.exports = Login;