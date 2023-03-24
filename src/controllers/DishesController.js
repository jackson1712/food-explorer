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
        
        const [dish_id] = await knex("dishes").insert({
            name,
            description,
            price,
            avatar_dish: filename,
            category_id: category.id,
        });
        
        const ingredientsArray = ingredients.split(",");
        
        const ingredientsInsert = ingredientsArray.map(ingredient => {
            return {
                dish_id,
                name: ingredient
            }
        })

        await knex("ingredients").insert(ingredientsInsert).groupBy("dish_id").orderBy("name");
        
        return response.status(200).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, description, price, category_name, ingredients } = request.body;
        const { filename: avatar_dish } = request.file;

        const filename = await diskStorage.saveFile(avatar_dish);

        const dish = await knex("dishes").where({ id }).first();
        const category = await knex("category").where({ name: category_name }).first();

        if (!dish) {
            throw new AppError("Este prato não existe.", 404);
        }

        dish.name = name ?? dish.name;
        dish.description = description ?? dish.description;
        dish.price = price ?? dish.price;
        dish.avatar_dish = filename ?? dish.avatar_dish;

        await knex("dishes").where({ id: dish.id }).update({
            name,
            description,
            price,
            avatar_dish: filename,
            category_id: category.id
        });

        const ingredientsList = ingredients.split(",");

        for (let i = 0; i < ingredientsList.length; i++) {
            const ingredient = ingredientsList[i];

            if (ingredient.id) {
                await knex("ingredients")
                .where({ id: ingredient.id })
                .update({ name: ingredient });
            } else {
                await knex("ingredients").insert({
                    dish_id: dish.id,
                    name: ingredient
                });
            }
        }

        return response.json();
    }

    async show(request, response) {
        const { id } = request.params;
        
        const dish = await knex("dishes").where({ id }).first();
        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");
        
        if(!dish) {
            throw new AppError("Este prato não existe", 404)
        }

        return response.json({
            ...dish,
            ingredients
        });
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