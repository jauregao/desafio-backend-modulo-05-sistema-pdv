const knex = require("../configs/connection/index");

const verifyEmailExistsUpdateClients = async (req, res, next) => {
    let { email } = req.body;
    const { id } = req.usuario;

    const emailExiste = await knex('clientes').where({ email }).whereNot({ id }).first();

    if (emailExiste) {
        return res.status(400).json('O Email já existe');
    };

    next();
};

module.exports = verifyEmailExistsUpdateClients;
