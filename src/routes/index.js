const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const requestsRoutes = require("./requests.routes");
const categoryRoutes = require("./category.routes");
const ItemsRequestsRoutes = require("./items_requests.routes");

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/requests", requestsRoutes);
routes.use("/category", categoryRoutes);
routes.use("/items_requests", ItemsRequestsRoutes);

module.exports = routes;


