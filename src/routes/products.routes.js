const express = require("express");
const productsRoutes = express();

const multer = require("multer");
const multerConfig = require("../configs/multerConfig");

const {
	postNewProduct,
	updateProduct,
	getProductById,
	getProduct,
	deleteProduct
} = require("../controllers/productsControllers/index");

const {
	verifyUserIsLogged,
	verifyCategoryExists,
	verifyDataProduct,
	verifyProductIdExists,
	verifyId,
	verifyPrice,
	verifyInventory
} = require("../middleware/index");

productsRoutes.use(verifyUserIsLogged);

productsRoutes.post(
	"/produto",
	multer(multerConfig).single("produto_imagem"),
	verifyDataProduct,
	verifyCategoryExists,
	verifyPrice,
	verifyInventory,
	postNewProduct
);

productsRoutes.put(
	"/produto/:id",
	multer(multerConfig).single("produto_imagem"),
	verifyId,
	verifyDataProduct,
	verifyProductIdExists,
	verifyCategoryExists,
	verifyPrice,
	verifyInventory,
	updateProduct
);

productsRoutes.get(
	"/produto",
	getProduct
);

productsRoutes.get(
	"/produto/:id",
	verifyId,
	verifyProductIdExists,
	getProductById
);

productsRoutes.delete(
	"/produto/:id",
	verifyId,
	verifyProductIdExists,
	deleteProduct
);

module.exports = productsRoutes;
