const express = require("express");
const ordersRoutes = express();
const { verifyUserIsLogged } = require("../middleware/index");
const { newOrder, listOrders } = require("../controllers/ordersControllers");


ordersRoutes.post("/pedido", verifyUserIsLogged, newOrder);
ordersRoutes.get("/pedido", verifyUserIsLogged, listOrders)

module.exports = ordersRoutes;
