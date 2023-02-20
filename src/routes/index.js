const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const requestsRoutes = require("./requests.routes");
const categoryRoutes = require("./category.routes");

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/requests", requestsRoutes);
routes.use("/category", categoryRoutes);

module.exports = routes;
