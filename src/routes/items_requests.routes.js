const { Router } = require("express");
const ItemsRequestsController = require("../controllers/ItemsRequestsController");

const ItemsRequestsRoutes = Router();
const itemsRequestsController = new ItemsRequestsController();

ItemsRequestsRoutes.post("/:request_id", itemsRequestsController.create);

module.exports = ItemsRequestsRoutes;