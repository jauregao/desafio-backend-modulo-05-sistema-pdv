const getUserData = async (req, res) => {
    try {
        const { senha, ...usuario } = req.usuario;

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

module.exports = getUserData;
