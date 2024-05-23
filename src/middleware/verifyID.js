const verifyId = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ mensagem: 'ID não informado' })
  };

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID precisa ser um número' })
  };

  next();
}
module.exports = verifyId;
