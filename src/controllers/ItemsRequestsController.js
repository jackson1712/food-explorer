const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class ItemsRequestsController{
    async create(request, response) {
        const { request_id } = request.params;
        const { amount, dish_name } = request.body;

        const dish_id = await knex("dishes").where({ name: dish_name }).first();

        if(!dish_id) {
            throw new AppError("Nome do prato não existe.")
        }

        const orderAddress = await knex("requests").where({ id: request_id }).first();

        if(!orderAddress) {
            throw new AppError("Número do pedido inexistente.")
        }

        const total_price = Number(amount * dish_id.price);

        await knex("items_requests").insert({
            amount,
            request_id: orderAddress.id,
            dish_id: dish_id.id,
            unit_price: dish_id.price,
            total_price
        }).groupBy("request_id");

        return response.json();
        
    }

    async update(request, response) {
        const { id } = request.params;
        const { amount, dish_id } = request.body;

        const itemUpdate = await knex("items_requests").where({ id }).first();
        const dishPrice = await knex("dishes").where({ id: dish_id }).first();

        if (dishPrice.id) {
            throw new AppError("Este item do pedido não existe.")
        }

        itemUpdate.dish_id = dish_id ?? itemUpdate.dish_id;
        itemUpdate.amount = amount ?? itemUpdate.amount;
        
        const total_price = Number(amount * dishPrice.price);

        await knex("items_requests").where({ id }).update({
            dish_id: itemUpdate.dish_id,
            amount: itemUpdate.amount,
            unit_price: dishPrice.price,
            total_price: total_price
        })

        return response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("items_requests").where({ id }).delete();

        return response.json();
    }
}

module.exports = ItemsRequestsController;