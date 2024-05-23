const verifyName = (req, res, next) => {
    let { nome } = req.body;

    if (!nome) {
        return res.status(400).json("O Campo nome é obrigatório.");
    };

    next();
};

module.exports = verifyName;
