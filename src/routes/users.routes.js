const { Router } = require("express");
const usersRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController();

// function myMiddleware(request, response, next) {
//     if(!request.body.isAdmin) {
//         return response.json({ message : "Não autorizado" })
//     }

//     next();
// }


usersRoutes.post("/", /*myMiddleware,*/ usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;