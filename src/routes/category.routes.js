const { Router } = require("express");
const CategoryController = require("../controllers/CategoryController");

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post("/", categoryController.create);
categoryRoutes.delete("/:id", categoryController.delete);

module.exports = categoryRoutes;