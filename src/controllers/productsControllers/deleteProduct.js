const knex = require('../../configs/connection/index');
const { deleteFile } = require('../../services/storage')

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const verificarRegistroDeProduto = await knex("pedido_produtos").where({ produto_id: id })

        if (verificarRegistroDeProduto.length > 0) {
            return res.status(400).json({ mensagem: "O produto não pode ser excluído, pois esta registrado em um ou mais pedidos." })
        }

        const verificarProdutoImagem = await knex('produtos').where('id', id).whereNotNull('produto_imagem');

        if (verificarProdutoImagem.length > 0) {
            const produtoParaApagar = await knex('produtos').where({ id }).first();

            const url = produtoParaApagar.produto_imagem;
            const originalname = url.split('/').pop();

            await deleteFile(originalname)

            await knex("produtos").where({ id }).del();

            return res.status(200).json("Produto e imagem excluídos com Sucesso");
        } else {
            await knex("produtos").where({ id }).del();

            return res.status(200).json("Produto excluído com Sucesso");
        }
    } catch (error) {
        return res.status(500).json('Erro interno no servidor.')
    }
}

module.exports = deleteProduct;
