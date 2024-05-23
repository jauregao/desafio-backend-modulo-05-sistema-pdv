const knex = require("../configs/connection/index");

const verifyCpfExistsUpdate = async (req, res, next) => {
    const { id } = req.params;

    const { cpf } = req.body;

    const cpfExiste = await knex('clientes').where({ cpf }).whereNot({ id });

    if (cpfExiste.length > 0) {
        return res.status(400).json("O CPF já existe");
    };

    next();
};

module.exports = verifyCpfExistsUpdate;
