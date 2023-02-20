const AppError = require("../utils/AppError");
const knex = require("../database/knex");


class DishesController {
    async create(request, response) {
        const { name, description, price, category_name } = request.body;

        const checkDish = await knex("dishes").where({ name });

        if (checkDish.length > 0) {
            throw new AppError("Este prato já existe.")
        }

        const category = await knex("category").where({ name: category_name }).first();

        if (!category) {
            throw new AppError("Está categoria não existe")
        }

        await knex("dishes").insert({
            name,
            description,
            price,
            category_id: category.id
        });
        
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
        dish.category = category ?? dish.category;

        await knex("dishes").where({ id: dish.id }).update({
            name,
            description,
            price,
            category
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

    async index(request, response) {
        const { name } = request.query;

        let dishes;

        if(name) {
            dishes = await knex("dishes").select("*")
            .whereLike("name", `%${name}%`).orderBy("name");
        }else {
            dishes = await knex("dishes").select("*").orderBy("name");
        };

        return response.json(dishes);
    }

    async delete(request, response) {
        const { id } = request.params;

        const deleted = await knex("dishes").where({ id }).delete();

        if(!deleted) {
            throw new AppError("Este prato não existe.")
        }

        // await knex("dishes").select(deleted).delete();

        return response.json();
    }

}

module.exports = DishesController;