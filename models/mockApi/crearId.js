import { faker } from "@faker-js/faker";

export default async function crearId() {
  const id = faker.database.mongodbObjectId();

  return id;
}
