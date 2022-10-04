const options = {
  mariaDB: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "ecommerce",
    }
  },
  sqliteDB: {
    client: "sqlite3",
      connection: {
        filename: "./db/ecommerce.sqlite",
      },
    useNullAsDefault: true,
  }
}

module.exports = {options}