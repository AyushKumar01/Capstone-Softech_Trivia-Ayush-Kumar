exports.up = knex => {
    return knex.schema.createTable("comment", table => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("comment").notNullable();
      table.timestamp("comment_at").defaultTo(knex.fn.now());
      table.integer("userId").unsigned().notNullable().references("id").inTable("login").onUpdate("CASCADE").onDelete("CASCADE");
    });
  };

  exports.down = knex => {
    return knex.schema.dropTable("comment");
  };