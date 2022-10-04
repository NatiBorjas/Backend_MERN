const { faker } = require("@faker-js/faker");
faker.locale = "es";

function crearProductosApi (n=5) {
	let productos = [];
	for (let i = 0; i < n; i++) {
		productos.push({
			id: faker.database.mongodbObjectId(),
			nombre: faker.commerce.productName(),
			price: faker.commerce.price(50,100,0,'$'),
			thumbnail: faker.image.avatar()
		});
	}
}

module.exports = crearProductosApi