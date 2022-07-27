class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }

    getFullName() {
        console.log(`Bienvenidx! ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return console.log(`Total de mascotas: ${this.mascotas.length}`)
    }

    addBook(titulo, autor) {
        this.libros.push({titulo, autor});
    }

    getBookNames() {
        let titulos = [];
        for (let i = 0; i < this.libros.length; i++) {
            titulos.push(this.libros[i].titulo)
        }
        return console.log(titulos)
    }
}

const user1 = new Usuario ("Natalia", "Borjas", [{titulo: "El señor de los anillos", autor: "J. R. R. Tolkien"}, {titulo: "American gods", autor: "Neil Gaiman"}], ["gato", "perro"])

//EJECUCIÓN:
user1.getFullName();
console.log("Mascotas existentes:");
console.log(user1.mascotas);
user1.countMascotas();
user1.addMascota("loro");
console.log(user1.mascotas);
user1.countMascotas();
console.log("Libros en stock:");
console.log(user1.libros);
user1.addBook("One Piece" , "Eichiro Oda");
console.log(user1.libros);
console.log("Títulos:");
user1.getBookNames();
