const knex = require("../../configs/connection/index");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const crypt = process.env.JWT_SECRET_KEY;
const expires = process.env.JWT_EXPIRED;

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where({ email }).returning("*").first();

    if (!usuario) {
      return res.status(404).json("Usuário e/ou senha inválido(s).")
    };

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json("Usuário e/ou senha inválido(s).")
    };

    const token = jwt.sign({ id: usuario.id }, crypt, { expiresIn: expires });
    return res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      token: token
    });

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

module.exports = login;
