const verifyInventory = (req, res, next) => {
  const { quantidade_estoque } = req.body;

  if (quantidade_estoque <= 0 || !quantidade_estoque) {
    return res
      .status(400)
      .json({ message: "O estoque precisa ser informado e precisa ser maior do que zero." });
  }

  next();
}

module.exports = verifyInventory;
