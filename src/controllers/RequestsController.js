const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class RequestController {
    async create(request, response) {
        const user_id = request.user.id;
        
        if(!user_id) {
            throw new AppError("Se conecte para poder comprar.")
        }

        const [id] = await knex("requests").insert({ user_id });
        
        return response.json(id);
    }

    async show(request, response) {
        const { id } = request.params;

        const dataRequest = await knex("requests").where({ id }).first();

        if (!dataRequest) {
            throw new AppError("Esse pedido não existe, verifique o número.")
        }

        const dataItemsRequest = await knex("requests")
        .select([
            "items_requests.id",
            "items_requests.dish_id",
            "items_requests.amount",
            "items_requests.unit_price",
            "items_requests.total_price"
        ]).orderBy("total_price")
        .where("requests.id", id)
        .innerJoin("items_requests", "requests.id", "items_requests.request_id");


        return response.json({dataRequest, dataItemsRequest});
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("requests").where({ id }).delete();

        return response.json(id);
    }
}

module.exports = RequestController;