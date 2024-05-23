const knex = require("../configs/connection/index");

const verifyCpfExists = async (req, res, next) => {
    let { cpf } = req.body;

    const cpfExiste = await knex('clientes').where({ cpf }).first();

    if (cpfExiste) {
        return res.status(400).json("O CPF já existe");
    };

    next();
};

module.exports = verifyCpfExists;
