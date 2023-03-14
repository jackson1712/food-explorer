const { Router } = require("express");
const RequestController = require("../controllers/RequestsController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const requestsRoutes = Router();
const requestController = new RequestController();

requestsRoutes.use(ensureAuthenticated);

requestsRoutes.post("/", requestController.create);
requestsRoutes.get("/:id", requestController.show);
requestsRoutes.delete("/:id", requestController.delete);

module.exports = requestsRoutes;