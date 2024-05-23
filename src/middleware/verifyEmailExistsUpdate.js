const knex = require("../configs/connection/index");

const verifyEmailExistsUpdate = async (req, res, next) => {
    let { email } = req.body;
    const { id } = req.usuario;

    const emailExiste = await knex('usuarios').where({ email }).whereNot({ id }).first();

    if (emailExiste) {
        return res.status(400).json('O Email já existe');
    };

    next();
};

module.exports = verifyEmailExistsUpdate;
