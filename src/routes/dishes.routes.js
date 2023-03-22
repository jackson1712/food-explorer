const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const ImageDishController = require("../controllers/ImageDishController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER);

const dishesRoutes = Router();

const dishesController = new DishesController();
const imageDishController = new ImageDishController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", upload.single("avatar_dish"), dishesController.create);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.patch("/:id", upload.single("avatar_dish"), imageDishController.update);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;