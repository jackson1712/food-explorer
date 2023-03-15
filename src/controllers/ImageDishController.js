const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ImageDishController {
  async update (request, response) {
    const { id } = request.params;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();

    if(!dish) {
      throw new AppError("Este prato não existe.", 401);
    }

    if(dish.avatar_dish) {
      await diskStorage.deleteFile(dish.avatar_dish);
    }

    const filename = await diskStorage.saveFile(imageFilename);
    dish.avatar_dish = filename;

    await knex("dishes").update(dish).where({ id });

    return response.json(dish);
  }
}

module.exports = ImageDishController;