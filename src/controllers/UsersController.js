const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");
const knex = require("../database/knex");

const UserRepository = require("../repositories/UserRepository");

class UsersController {
    async create(request, response) {
        const { email, name, password } = request.body;

        const userRepository = new UserRepository();

        const checkUserExists = await userRepository.findByEmail(email);

        if(checkUserExists) {
            throw new AppError("Este email já está sendo usado", 401);
        }

        const hashedPassword = await hash(password, 8);

        await userRepository.create({ name, email, password: hashedPassword });

        return response.json();
    }

    async update(request, response) {
        const { name, email, password, old_password, isAdmin } = request.body;
        const user_id  = request.user.id;

        const user = await knex("users").where({ id: user_id }).first();

        if(!user) {
            throw new AppError("Usuário não encontrado.")
        }

        const checkIfEmailExists = await knex("users").where({ email }).first();

        if(checkIfEmailExists && checkIfEmailExists.id !== user.id) {
            throw new AppError("Este email já está em uso.")
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && old_password) {
            const checkPasswords = await compare(old_password, user.password);

            if(!checkPasswords) {
                throw new AppError("A senha antiga está inválida.")
            }

            user.password = await hash(password, 8);
        }

        await knex("users").where({ id: user_id }).update({
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin
        })

        return response.json();
    }
}


module.exports = UsersController;