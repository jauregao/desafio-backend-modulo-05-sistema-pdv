const knex = require('../../configs/connection/index');

const getProduct = async (req, res) => {
    const { categoria_id } = req.query;

    try {

        if (categoria_id) {
            if (isNaN(categoria_id)) {
                return res.status(400).json({ mensagem: "Id da categoria precisa ser um número." });
            };

            const categoryExists = await knex("categorias")
                .where({ id: categoria_id })
                .first();

            if (!categoryExists) {
                return res.status(400).json({ mensagem: "Categoria não existente." });

            } else {
                const listaDeProdutos = await knex("produtos").where({ categoria_id });

                if (listaDeProdutos.length === 0) {
                    return res.status(404).json('Não há produtos registrados nesta categoria.');
                }
                return res.status(200).json(listaDeProdutos);
            }
        } else {
            const listaDeProdutos = await knex('produtos');

            return res.status(200).json(listaDeProdutos);
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no Servidor.' });
    };
};

module.exports = getProduct;
