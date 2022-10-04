const { faker } = require("@faker-js/faker");
faker.locale = "es";

function generarId() {
  return faker.datatype.uuid();
}

module.exports = generarId