const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

const diskStorage = new DiskStorage();

class DishesController {
    async create(request, response) {
        const { name, description, price, category_name, ingredients } = request.body;
        const { filename: avatar_dish } = request.file;
        
        const filename = await diskStorage.saveFile(avatar_dish)

        const checkDish = await knex("dishes").where({ name });

        if (checkDish.length > 0) {
            throw new AppError("Este prato já existe.", 401)
        }

        const category = await knex("category").where({ name: category_name }).first();

        if (!category) {
            throw new AppError("Está categoria não existe", 401)
        }

        await knex("dishes").insert({
            name,
            description,
            price,
            avatar_dish: filename,
            category_id: category.id,
            ingredients
        });
        
        return response.status(200).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, description, price, category } = request.body;

        const dish = await knex("dishes").where({ id }).first();

        if (!dish) {
            throw new AppError("Este prato não existe.", 404);
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
            throw new AppError("Este prato não existe", 404)
        }

        return response.json(dish);
    }

    async index(request, response) {
        const { name, ingredients } = request.query;

        let dishes;

        if(ingredients) {
            dishes = await knex("dishes").select("*")
            .whereLike("ingredients", `%${ingredients}%`).groupBy("ingredients").orderBy("price");
        }else if(name) {
            dishes = await knex("dishes").select("*")
            .whereLike("name", `%${name}%`).groupBy("name").orderBy("price");
        }else{
            dishes = await knex("dishes").select("*")
        };

        return response.json(dishes);
    }

    async delete(request, response) {
        const { id } = request.params;

        const deleted = await knex("dishes").where({ id }).delete();

        if(!deleted) {
            throw new AppError("Este prato não existe.", 404)
        }

        // await knex("dishes").select(deleted).delete();

        return response.json();
    }

}

module.exports = DishesController;