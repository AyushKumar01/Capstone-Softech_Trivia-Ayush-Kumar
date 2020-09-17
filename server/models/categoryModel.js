const bookshelf = require("../bookshelf");

const Category = bookshelf.model("category", {
  tableName: "category"
});

module.exports = Category;