const knex = require("../../configs/connection/index");
const transporter = require("../../configs/connection/mailConnection");
const compilerHtml = require("../../utils/htmlCompiler");

const checkProductExists = async (productId) => {
	const product = await knex("produtos").where({ id: productId }).first();
	return product;
};

const newOrder = async (req, res) => {
	const { cliente_id, observacao, pedido_produtos } = req.body;

	try {
		if (!cliente_id || !pedido_produtos) {
			return res.status(400).json({
				mensagem: "O id do cliente e o pedido precisam ser informados",
			});
		}

		const clientExists = await knex("clientes")
			.where({ id: cliente_id })
			.first();

		if (!clientExists) {
			return res
				.status(404)
				.json({ mensagen: "O cliente informado não existe." });
		}

		if (pedido_produtos.length < 1) {
			return res.status(400).json({ mensagem: "O pedido está vazio." });
		}

		let totalPedido = 0;

		for (let item of pedido_produtos) {
			if (!item.produto_id) {
				return res
					.status(404)
					.json({ mensagem: "O id do produto precisa ser informado." });
			}

			const productExists = await checkProductExists(item.produto_id);

			if (!productExists) {
				return res
					.status(404)
					.json({ mensagem: "O produto informado não existe" });
			}

			if (!item.quantidade_produto || item.quantidade_produto < 1) {
				return res.status(404).json({
					mensagem:
						"A quantidade do produto precisa ser informada e maior do que zero.",
				});
			}

			const stock = await knex
				.select("quantidade_estoque")
				.from("produtos")
				.where({ id: item.produto_id })
				.first();

			if (stock.quantidade_estoque < item.quantidade_produto) {
				return res.status(404).json({ mensagem: "Estoque insuficiente" });
			}

			let estoqueProduto = stock.quantidade_estoque - item.quantidade_produto;
			await knex("produtos")
				.where({ id: item.produto_id })
				.update("quantidade_estoque", estoqueProduto);

			totalPedido += productExists.valor * item.quantidade_produto;
		}

		const [pedido] = await knex("pedidos").returning("*").insert({
			cliente_id,
			observacao,
			valor_total: totalPedido,
		});
		for (let item of pedido_produtos) {
			const productExists = await checkProductExists(item.produto_id);
			await knex("pedido_produtos").insert({
				pedido_id: pedido.id,
				produto_id: item.produto_id,
				quantidade_produto: item.quantidade_produto,
				valor_produto: productExists.valor,
			});
		}

		const cliente = await knex("clientes").where({ id: cliente_id }).first();

		let valorReais = totalPedido / 100;
		let valorFormatado = valorReais.toFixed(2);

		const htmlMail = await compilerHtml("./src/templates/orderConfirmed.html", {
			nomeusuario: cliente.nome,
			valorpedido: valorFormatado,
		});

		await transporter.sendMail({
			from: `"Grupo 3" <${process.env.MAIL_FROM}>`,
			to: `${cliente.nome} <${cliente.email}>`,
			subject: "Pedido confirmado",
			html: htmlMail,
		});

		return res.status(200).json({ pedido, pedido_produtos });
	} catch (error) {
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};

module.exports = newOrder;
