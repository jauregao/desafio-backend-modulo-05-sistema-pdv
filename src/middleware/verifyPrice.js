const verifyPrice = (req, res, next) => {
  const { valor } = req.body;

  if (valor <= 0 || !valor) {
    return res
      .status(400)
      .json({ messagem: "O valor precisa ser informado e precisa ser maior do que zero." });
  };

  next();
};

module.exports = verifyPrice;
