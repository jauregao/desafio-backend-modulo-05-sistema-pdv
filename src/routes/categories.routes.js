const express = require("express");
const categoriesRoutes = express();

const getAllCategories = require("../controllers/categoriesControllers/index");

categoriesRoutes.get("/categoria", getAllCategories);

module.exports = categoriesRoutes;
