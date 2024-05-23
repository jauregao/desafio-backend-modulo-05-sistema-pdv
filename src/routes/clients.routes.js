const express = require("express");

const clientsRoutes = express();

const {
  verifyUserIsLogged,
  verifyEmail,
  verifyEmailExistsClients,
  verifyCpf,
  verifyCpfExists,
  verifyName,
  verifyClientIdExists,
  verifyId,
  verifyEmailExistsUpdateClients,
  verifyCpfExistsUpdate
} = require("../middleware/index");

const {
  getClients,
  clientRegister,
  clientUpdate,
  detailClient
} = require("../controllers/clientsControllers/index");

clientsRoutes.use(verifyUserIsLogged);

clientsRoutes.post(
  "/cliente",
  verifyName,
  verifyEmail,
  verifyCpf,
  verifyEmailExistsClients,
  verifyCpfExists,
  clientRegister
);

clientsRoutes.post(
  "/cliente/:id",
  verifyId,
  verifyClientIdExists,
  verifyName,
  verifyEmail,
  verifyCpf,
  verifyCpfExists,
  verifyEmailExistsClients,
  clientUpdate
);

clientsRoutes.get(
  "/cliente",
  getClients
);

clientsRoutes.get(
  "/cliente/:id",
  verifyId,
  verifyClientIdExists,
  detailClient
);

clientsRoutes.put(
  "/cliente/:id",
  verifyId,
  verifyClientIdExists,
  verifyName,
  verifyEmail,
  verifyCpf,
  verifyCpfExistsUpdate,
  verifyEmailExistsUpdateClients,
  clientUpdate
)

module.exports = clientsRoutes;
