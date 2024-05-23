const verifyEmailIsValidType = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const emailValido = emailRegex.test(email);

  if (!emailValido) {
    return res.status(400).json({ mensagem: "Informe um email válido." })
  };

  next();

}

module.exports = verifyEmailIsValidType;
