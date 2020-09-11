exports.up = knex => {
    return knex.schema.createTable("login", table => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("email").notNullable();
      table.timestamp("login_at").defaultTo(knex.fn.now());
    });
  };

  exports.down = knex => {
    return knex.schema.dropTable("login");
  };
