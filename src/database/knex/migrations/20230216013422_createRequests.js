exports.up = knex => knex.schema.createTable("requests", table => {
    table.increments("id").primary();
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
    table.float("total_price");
})


exports.down = knex => knex.schema.dropTable("requests");