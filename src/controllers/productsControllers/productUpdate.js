const knex = require("../../configs/connection/index");

const { uploadFile } = require("../../services/storage");

const updateProduct = async (req, res) => {
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
	const { id } = req.params;

	try {
		const produtoAtualizado = await knex("produtos")
			.where({ id })
			.update({ descricao, quantidade_estoque, valor, categoria_id })
			.returning("*");

		if (req.file) {
			const { originalname, mimetype, buffer } = req.file;

			const uploadedFile = await uploadFile(originalname, buffer, mimetype);

			await knex("produtos")
				.update({
					produto_imagem: uploadedFile.url,
				})
				.where({ id });

			produtoAtualizado[0].produto_imagem = uploadedFile.url;
		};

		return res.status(201).json(produtoAtualizado[0]);
	} catch (error) {
		return res.status(500).json({ message: "Erro interno do servidor." });
	}
};

module.exports = updateProduct;
