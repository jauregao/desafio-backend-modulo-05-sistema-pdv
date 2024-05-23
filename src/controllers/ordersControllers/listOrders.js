const knex = require('../../configs/connection/index');

const listOrders = async (req, res) => {
    const clientId = req.query.client_id;

    try {
        let query = knex("pedidos")
            .select("pedidos.*", "pedido_produtos.*")
            .leftJoin("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id");

        if (clientId) {
            query = query.where("cliente_id", clientId);
        }

        const orders = await query;

        if (orders.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum pedido encontrado para o cliente especificado." });
        }
        
        const orderProducts = await knex("pedido_produtos");

        const formattedOrdersProducts = orderProducts.map((produto) => ({
            id: produto.id,
            quantidade_produto: produto.quantidade_produto,
            valor_produto: produto.valor_produto,
            pedido_id: produto.pedido_id,
            produto_id: produto.produto_id
        }));

        const formattedOrders = orders.map((order) => ({
            pedido: {
                id: order.id,
                valor_total: order.valor_total,
                observacao: order.observacao,
                cliente_id: order.client_id
            },
            pedido_produtos: formattedOrdersProducts
        }));

        return res.status(200).json(formattedOrders);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = listOrders;