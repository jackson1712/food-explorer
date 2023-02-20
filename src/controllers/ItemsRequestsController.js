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
        })

        return response.json();
        
    }
}

module.exports = ItemsRequestsController;