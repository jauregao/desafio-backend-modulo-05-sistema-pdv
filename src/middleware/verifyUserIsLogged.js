const knex = require("../configs/connection/index");
const jwt = require("jsonwebtoken");
const crypt = process.env.JWT_SECRET_KEY;

const verifyUserIsLogged = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json("Não autorizado");
	}

	try {
		const token = authorization.replace("Bearer ", "").trim();

		const { id } = jwt.verify(token, crypt);

		const query = await knex("usuarios").where({ id });

		if (query.length === 0) {
			return res.status(404).json("Usuario não encontrado");
		}

		const { senha, ...usuario } = query;

		req.usuario = usuario[0];

		next();
	} catch (error) {
		return res.status(500).json({ mensagem: "Erro interno do servidor." });
	}
};

module.exports = verifyUserIsLogged;
