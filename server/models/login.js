const bookshelf = require("../bookshelf");

const Login = bookshelf.model("login", {
  tableName: "login"
});

module.exports = Login;