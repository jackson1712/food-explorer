const { Router } = require("express");
const DishesController = require("../controllers/DishesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishesRoutes = Router();
const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;