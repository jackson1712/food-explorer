const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");

class UsersController {
    create(request, response) {
        const { id } = request.params;
        const { email, name, password } = request.body;

        return response.json({ email, name, password });
    }
}

module.exports = UsersController;