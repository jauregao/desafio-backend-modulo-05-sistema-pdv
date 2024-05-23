// knex não é necessário aqui, esse arquivo é onde reunimos todos os
// intermediarios para importarmos de um arquivo só no entry point (nesse caso, app.js)

const verifyUserIsLogged = require("./verifyUserIsLogged");
const login = require("../controllers/usersControllers/login");
const verifyEmail = require("./verifyEmail");
const verifyEmailExistsUsers = require("./verifyEmailExistsUsers");
const verifyEmailExistsClients = require("./verifyEmailExistsClients");
const verifyEmailExistsUpdate = require("./verifyEmailExistsUpdate");
const verifyName = require("./verifyName");
const verifyPassword = require("./verifyPassword");
const verifyEmailIsValidType = require("./verifyEmailIsValidType");
const verifyCategoryExists = require("./verifyCategoryExists");
const verifyDataProduct = require("./verifyDataProduct");
const verifyProductIdExists = require("./verifyProductIdExists");
const verifyClientIdExists = require("./verifyClientIdExists");
const verifyCpf = require("./verifyCpf");
const verifyCpfExists = require("./verifyCpfExists");
const verifyId = require("./verifyID");
const verifyPrice = require("./verifyPrice");
const verifyInventory = require("./verifyInventory");
const verifyEmailExistsUpdateClients = require("./verifyEmailExistsUpdateClients");
const verifyCpfExistsUpdate = require('./verifyCpfExistsUpdate');

module.exports = {
	verifyUserIsLogged,
	login,
	verifyEmail,
	verifyEmailExistsUsers,
	verifyEmailExistsClients,
	verifyName,
	verifyPassword,
	verifyEmailExistsUpdate,
	verifyEmailIsValidType,
	verifyCategoryExists,
	verifyDataProduct,
	verifyProductIdExists,
	verifyClientIdExists,
	verifyCpf,
	verifyCpfExists,
	verifyId,
	verifyPrice,
	verifyInventory,
	verifyEmailExistsUpdateClients,
	verifyCpfExistsUpdate
};
