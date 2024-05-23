const express = require("express");
const usersRoutes = express();

const {
  verifyUserIsLogged,
  verifyEmail,
  verifyEmailExistsUsers,
  verifyName,
  verifyPassword,
  verifyEmailExistsUpdate,
  verifyEmailIsValidType
} = require("../middleware/index");

const {
  userRegister,
  userUpdate,
  login,
  getUserData
} = require("../controllers/usersControllers/index");

usersRoutes.post(
  "/login",
  verifyEmail,
  verifyPassword,
  login
);

usersRoutes.post(
  "/usuario",
  verifyName,
  verifyEmail,
  verifyPassword,
  verifyEmailIsValidType,
  verifyEmailExistsUsers,
  userRegister
);

usersRoutes.use(verifyUserIsLogged);

usersRoutes.get(
  "/usuario",
  getUserData
);

usersRoutes.put(
  "/usuario",
  verifyName,
  verifyEmail,
  verifyPassword,
  verifyEmailIsValidType,
  verifyEmailExistsUpdate,
  userUpdate
);

module.exports = usersRoutes;
