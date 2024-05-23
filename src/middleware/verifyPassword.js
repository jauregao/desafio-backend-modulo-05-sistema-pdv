const verifyPassword = (req, res, next) => {
    let { senha } = req.body;

    if (!senha) {
        return res.status(400).json("O Campo senha é obrigatório.");
    };

    next();
};

module.exports = verifyPassword;
