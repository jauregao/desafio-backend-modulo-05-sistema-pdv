const knex = require("../../configs/connection/index");

const { uploadFile } = require("../../services/storage");

const postNewProduct = async (req, res) => {
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

	try {
		const novoProduto = await knex("produtos").insert({
			descricao,
			quantidade_estoque,
			valor,
			categoria_id
		}).returning("*");

		if (req.file) {
			const { originalname, mimetype, buffer } = req.file;

			const uploadedFile = await uploadFile(originalname, buffer, mimetype);

			await knex("produtos")
				.update({
					produto_imagem: uploadedFile.url,
				})
				.where({ descricao, quantidade_estoque, valor, categoria_id });

			novoProduto[0].produto_imagem = uploadedFile.url;
		}

		return res.status(201).json(novoProduto[0]);
	} catch (error) {
		return res.status(500).json({ message: "Erro interno do servidor." });
	}
};

module.exports = postNewProduct;
