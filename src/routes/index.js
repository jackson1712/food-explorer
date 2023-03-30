const { Router } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const favoritesRoutes = require("./favorites.routes");
const requestsRoutes = require("./requests.routes");
const categoryRoutes = require("./category.routes");
const itemsRequestsRoutes = require("./items_requests.routes");

const sessionsRoutes = require("./sessions.routes");


routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/favorites", favoritesRoutes);
routes.use("/requests", requestsRoutes);
routes.use("/category", categoryRoutes);
routes.use("/items_requests", itemsRequestsRoutes);

routes.use("/sessions", sessionsRoutes);

module.exports = routes;


