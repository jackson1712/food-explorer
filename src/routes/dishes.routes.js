const { Router } = require("express");
const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();
const dishesController = new DishesController();

dishesRoutes.post("/", dishesController.create);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/:id", dishesController.show);

module.exports = dishesRoutes;