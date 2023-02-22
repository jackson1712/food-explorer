const { Router } = require("express");
const ItemsRequestsController = require("../controllers/ItemsRequestsController");

const itemsRequestsRoutes = Router();
const itemsRequestsController = new ItemsRequestsController();

itemsRequestsRoutes.post("/:request_id", itemsRequestsController.create);
itemsRequestsRoutes.put("/:id", itemsRequestsController.update);
itemsRequestsRoutes.delete("/:id", itemsRequestsController.delete);

module.exports = itemsRequestsRoutes;