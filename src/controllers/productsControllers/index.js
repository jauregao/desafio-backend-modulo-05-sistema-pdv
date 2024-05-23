const postNewProduct = require("./postProduct");
const updateProduct = require("./productUpdate");
const getProductById = require("./getProductById")
const getProduct = require("./getProduct");
const deleteProduct = require("./deleteProduct");

module.exports = {
  postNewProduct,
  updateProduct,
  getProductById,
  getProduct,
  deleteProduct
};
