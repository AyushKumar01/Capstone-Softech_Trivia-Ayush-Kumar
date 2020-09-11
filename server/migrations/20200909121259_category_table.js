exports.up = knex => {
    return knex.schema.createTable("category", table => {
      table.increments("id").primary();
      table.string("category").notNullable();
      table.string("imageName").notNullable();
    });
  };

  exports.down = knex => {
    return knex.schema.dropTable("category");
  };
