const knex = require("../database/knex");
const AppError = require("../utils/AppError")

class SetIfUserIsAdminController {
    async update (request, response) {
        const { id } = request.params;
        const { isAdmin } = request.body;

        const checkUser = await knex("users").where({ id }).first();

        if(!checkUser) {
            throw new AppError("Usuário não existe", 401)
        }

        checkUser.isAdmin = isAdmin ?? checkUser.isAdmin

        await knex("users").where({ id }).update({
            isAdmin: checkUser.isAdmin
        })

        return response.json();
    }
}

module.exports = SetIfUserIsAdminController;
