const knex = require('../../configs/connection/index');
const bcrypt = require('bcrypt');

const userUpdate = async (req, res) => {
    const { id } = req.usuario;
    let { nome, email, senha } = req.body;

    try {
        if (senha) {
            senha = await bcrypt.hash(senha, 10);
        };

        const update = await knex('usuarios').where({ id }).update({
            nome,
            email,
            senha
        });

        if (!update) {
            return res.status(400).json('O usuário não foi atualizado')
        };

        return res.status(201).json('O usuário foi atualizado com sucesso');

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

module.exports = userUpdate; 
