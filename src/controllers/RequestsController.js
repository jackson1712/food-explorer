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

    async index(request, response) {

        const orderAll = await knex("items_requests")
        .select([
            "requests.id",
            "requests.created_at",
            "requests.user_id"
        ]).innerJoin("requests", "requests.id", "items_requests.request_id").groupBy("request_id");

        const items_requests = await knex("items_requests")
        .select([
            "dish_id",
            "amount",
            "request_id"
        ]);

        const requestWithItem = await Promise.all(orderAll.map(async order => {
            const items = await knex("items_requests")
                .select([
                    "dishes.name as dish_name",
                    "items_requests.amount",
                    "items_requests.request_id"
                ])
                .innerJoin("dishes", "dishes.id", "items_requests.dish_id")
                .where("items_requests.request_id", order.id);
        
            return {
                ...order,
                items
            };
        }));

        return response.json(requestWithItem);
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("requests").where({ id }).delete();

        return response.json(id);
    }
}

module.exports = RequestController;