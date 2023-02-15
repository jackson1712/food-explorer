const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");
const knex = require("../database/knex");

class UsersController {
    async create(request, response) {
        const { email, name, password } = request.body;

        const checkUserExists = await knex("users").where({ email }).first();

        if(checkUserExists) {
            throw new AppError("Este email já está sendo usado", 401)
        }

    
        await knex("users").insert({
            name,
            email,
            password
        })


        return response.json();
    }
}

module.exports = UsersController;