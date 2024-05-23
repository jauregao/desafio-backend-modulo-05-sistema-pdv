const knex = require("../configs/connection/index");

const verifyEmailExists = async (req, res, next) => {
    let { email } = req.body;

    const emailExiste = await knex('clientes').where({ email }).first();

    if (emailExiste) {
        return res.status(400).json('O Email já existe');
    };

    next();
};

module.exports = verifyEmailExists;
