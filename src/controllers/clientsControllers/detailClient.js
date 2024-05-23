const knex = require("../../configs/connection/index");

const detailClient = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await knex('clientes').where({ id }).first();

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        return res.json(cliente);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}
module.exports = detailClient;
