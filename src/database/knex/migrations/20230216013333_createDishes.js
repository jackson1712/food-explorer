exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.string("avatar_dish")
    table.text("description");
    table.float("price");
    table.integer("category_id").references("id").inTable("category");
});


exports.down = knex => knex.schema.dropTable("dishes");