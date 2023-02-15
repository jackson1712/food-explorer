const { Router, request, response } = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");

routes.use("/users", usersRoutes);

module.exports = routes;
