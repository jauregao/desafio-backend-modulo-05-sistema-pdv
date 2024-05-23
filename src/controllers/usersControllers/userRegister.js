const knex = require("../../configs/connection/index");
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const keyCrypt = await bcrypt.hash(senha, 10);

        await knex("usuarios").insert({ nome, email, senha: keyCrypt });

        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = userRegister;
