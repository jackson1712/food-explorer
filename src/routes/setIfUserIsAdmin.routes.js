const { Router } = require("express");
const setIfUserIsAdminRoutes = Router();

const SetIfUserIsAdminController = require("../controllers/SetIfUserIsAdminController");
const setIfUserIsAdminController = new SetIfUserIsAdminController();


setIfUserIsAdminRoutes.patch("/:id", setIfUserIsAdminController.update);

module.exports = setIfUserIsAdminRoutes;