const knex = require("../configs/connection/index");

const verifyClientIdExists = async (req, res, next) => {
	const { id } = req.params;

	const idExists = await knex("clientes").where({ id }).first();

	if (!idExists) {
		return res
			.status(404)
			.json({ mensagen: "O cliente informado não existe." });
	}

	next();
};

module.exports = verifyClientIdExists;
