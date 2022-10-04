class KnexContenedor {
  constructor(knex, tabla){
    this.knex = knex;
    this.tabla= tabla;
  }

  async getAll() {
    try {
      const data = await this.knex(this.tabla);
      return data;
    } catch (error) {
      console.log(`Hubo un error con la base: ${this.knex}`);
    }
  }

  async save(item) {
    try {
      await this.knex(this.tabla).insert(item);
      return item
    } catch (error) {
      console.log("Hubo un error:" + error);
    }
  }
}

module.exports = KnexContenedor;
