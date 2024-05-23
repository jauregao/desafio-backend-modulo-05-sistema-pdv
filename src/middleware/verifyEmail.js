const verifyEmail = (req, res, next) => {
    let { email } = req.body;

    if (!email) {
        return res.status(400).json("O Campo email é obrigatório.");
    };

    next();
};

module.exports = verifyEmail;
