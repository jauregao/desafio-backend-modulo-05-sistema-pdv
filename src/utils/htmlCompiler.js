const fs = require("fs/promises");
const handlebars = require("handlebars");

const compilerHtml = async (file, context) => {
	const htmlFile = await fs.readFile(file);
	const compiler = handlebars.compile(htmlFile.toString());
	const htmlString = compiler(context);
	return htmlString;
};

module.exports = compilerHtml;
