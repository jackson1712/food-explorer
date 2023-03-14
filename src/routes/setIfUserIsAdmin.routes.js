const { Router } = require("express");
const setIfUserIsAdminRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const SetIfUserIsAdminController = require("../controllers/SetIfUserIsAdminController");
const setIfUserIsAdminController = new SetIfUserIsAdminController();



setIfUserIsAdminRoutes.patch("/", ensureAuthenticated, setIfUserIsAdminController.update);

module.exports = setIfUserIsAdminRoutes;