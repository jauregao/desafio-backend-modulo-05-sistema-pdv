const verifyDataProduct = async (req, res, next) => {
	const { descricao } = req.body;

	if (!descricao) {
		return res
			.status(400)
			.json({ message: "Todos os dados precisam ser informados" });
	}

	next();
};

module.exports = verifyDataProduct;
