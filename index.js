const { options } = require("./options/mariaDB");
const knex = require("knex")(options);

// CREAR TABLA // 
// knex.schema
// .createTable("productos", (table) => {
//     table.increments("id_prod"), 
//     table.string("nombre"), 
//     table.integer("precio");
//     table.integer("stock");
// })
// .then(() => {
//     console.log("todo bien");
// })
// .catch((err) => {
//     console.log(err);
//     throw new Error(err);
// })
// .finally(() => {
//     knex.destroy();
// });

// CREAR PRODUCTOS // 
// const productos = [
//     { nombre: "cartera", precio: 100, stock: 12 },
//     { nombre: "pelota", precio: 11, stock: 2 },
//     { nombre: "zapato", precio: 500, stock: 25 },
// ];

// AGREGAR PRODUCTOS // 
// knex("productos")
//     .insert(productos)
//     .then((res) => console.log("todo ok", res))
//     .catch((e) => console.log(e))
//     .finally(() => knex.destroy());

// BUSCAR PRODUCTOS // 
knex
    .from("productos")
    .select("*")
    .then((res) => {
        // res = res.map((item) => ({
        // idProduct: item["id_prod"],
        // nombre: item.nombre,
        // precio: item.precio,
        // stock: item.stock,
        // })); 
        res.forEach((item) => console.log(item));
    })
    .catch((e) => console.log(e))
    .finally(() => knex.destroy());