const AppError = require("../utils/AppError");
const knex = require("../database/knex");


class DishesController {
    async create(request, response) {
        const { name, description, price } = request.body;

        const checkDish = await knex("dishes").where({ name }).first();

        if (checkDish) {
            throw new AppError("Este prato já existe.")
        }

        await knex("dishes").insert({
            name,
            description,
            price
        })

        return response.status(200).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, description, price } = request.body;

        const dish = await knex("dishes").where({ id }).first();

        if (!dish) {
            throw new AppError("Este prato não existe.")
        }

        dish.name = name ?? dish.name;
        dish.description = description ?? dish.description;
        dish.price = price ?? dish.price;

        await knex("dishes").where({ id: dish.id }).update({
            name,
            description,
            price
        })

        return response.json();
    }

    async show(request, response) {
        const { id } = request.params;
        
        const dish = await knex("dishes").where({ id }).first();
        
        if(!dish) {
            throw new AppError("Este prato não existe")
        }

        return response.json(dish);
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("dishes").where({ id }).delete();

        return response.json();
    }

}

module.exports = DishesController;