const { faker } = require("@faker-js/faker");
faker.locale = "es";

function generarId() {
	const fakerId = faker.database.mongodbObjectId();
  return fakerId
}

module.exports = {generarId}