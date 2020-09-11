exports.up = knex => {
    return knex.schema.createTable("question", table => {
      table.increments("id").primary();
      table.string("questionName").notNullable();
      table.json("multipleChoice").notNullable();
      table.string("answer").notNullable();
      table.integer("categoryId").unsigned().notNullable().references("id").inTable("category").onUpdate("CASCADE").onDelete("CASCADE");
    });
  };

  exports.down = knex => {
    return knex.schema.dropTable("question");
  };