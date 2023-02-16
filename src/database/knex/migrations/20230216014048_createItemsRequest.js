exports.up = knex => knex.schema.createTable("items_request", table => {
    table.increments("id").primary();
    table.integer("request_id").references("id").inTable("requests").onDelete("CASCADE");
    table.integer("dish_id").references("id").inTable("dishes");
    table.integer("amount");
    table.float("unit_price");
})


exports.down = knex => knex.schema.dropTable("items_requests");
