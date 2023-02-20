const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class RequestController {
    async create(request, response) {
        const { user_id } = request.params;
        
        await knex("requests").where({ user_id });
        
        if(!user_id) {
            throw new AppError("Se conecte para poder comprar.")
        }

            await knex("requests").insert({
                user_id,
            });

        return response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("requests").where({ id }).delete();

        return response.json();
    }
}

module.exports = RequestController;