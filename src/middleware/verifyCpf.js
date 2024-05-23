const verifyCpf = (req, res, next) => {
    let { cpf } = req.body;

    if (!cpf) {
        return res.status(400).json("O Campo cpf é obrigatório.");
    };

    next();
};

module.exports = verifyCpf;
