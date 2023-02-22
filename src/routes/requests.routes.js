const { Router } = require("express");
const RequestController = require("../controllers/RequestsController");

const requestsRoutes = Router();
const requestController = new RequestController();

requestsRoutes.post("/:user_id", requestController.create);
requestsRoutes.get("/:user_id", requestController.show);
requestsRoutes.delete("/:id", requestController.delete);

module.exports = requestsRoutes;