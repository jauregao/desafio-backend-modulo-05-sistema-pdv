const express = require("express");
const app = express();

const cors = require("cors");

const port = process.env.PORT || 3000;

require("dotenv").config();
app.use(express.json());

const categoriesRoutes = require("./routes/categories.routes");
const usersRoutes = require("./routes/users.routes");
const productsRoutes = require("./routes/products.routes");
const clientsRoutes = require("./routes/clients.routes");
const ordersRoutes = require("./routes/orders.routes");

app.use(cors());

app.use(categoriesRoutes);
app.use(usersRoutes);
app.use(productsRoutes);
app.use(clientsRoutes);
app.use(ordersRoutes);

app.listen(port);
