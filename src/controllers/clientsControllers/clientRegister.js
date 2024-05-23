const knex = require('../../configs/connection/index');

const clientRegister = async (req, res) => {
    const { nome, email, cpf } = req.body;

    try {
        const novoCliente = await knex("clientes")
            .insert({ nome, email, cpf })
            .returning("*");

        return res.status(201).json(novoCliente[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    };

};

module.exports = clientRegister;
