const knex = require("../configs/connection/index");

const verifyProductIdExists = async (req, res, next) => {
	const { id } = req.params;

	const idExists = await knex("produtos").where({ id }).first();

	if (!idExists) {
		return res
			.status(404)
			.json({ mensagen: "O produto informado não existe." });
	}

	next();
};

module.exports = verifyProductIdExists;
