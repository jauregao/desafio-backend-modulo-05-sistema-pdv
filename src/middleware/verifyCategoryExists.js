const knex = require("../configs/connection/index");

const verifyCategoryExists = async (req, res, next) => {
	const { categoria_id } = req.body;

	if (!categoria_id) {
		return res.status(404).json({ mensagen: "Categoria não informada." });
	}

	const categoryExists = await knex("categorias")
		.where("id", categoria_id)
		.first();

	if (!categoryExists) {
		return res.status(404).json({ mensagen: "Categoria não existente." });
	}

	next();
}

module.exports = verifyCategoryExists;
