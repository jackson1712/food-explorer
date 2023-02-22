const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const setIfUserIsAdminRoutes = require("./setIfUserIsAdmin.routes");
const dishesRoutes = require("./dishes.routes");
const requestsRoutes = require("./requests.routes");
const categoryRoutes = require("./category.routes");
const itemsRequestsRoutes = require("./items_requests.routes");

routes.use("/users", usersRoutes);
routes.use("/users", setIfUserIsAdminRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/requests", requestsRoutes);
routes.use("/category", categoryRoutes);
routes.use("/items_requests", itemsRequestsRoutes);

module.exports = routes;


