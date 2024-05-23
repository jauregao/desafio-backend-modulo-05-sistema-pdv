const knex = require("../../configs/connection/index");

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("produtos").where({ id });

    if (!produto) {
      return res.status(401).json({ mensagem: "Produto não encontrado" });
    }

    return res.json(produto);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = getProductById;
