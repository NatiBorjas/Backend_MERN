import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";
import {chatSocket} from "./src/utils/socketChat.js";
import {homeRouter, productosRouter, loginRouter, logoutRouter,signupRouter  } from "./routes/index.js";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import redis from "redis";
import connectRedis from "connect-redis";
import mongoose from "mongoose";
import Usuarios from "./models/usuariosSchema.js";
import { isValidPassword, createHash } from "./src/utils/passwordsFunctions.js";

// SERVIDOR EXPRESS Y SOCKETS//
const app = express();
const PORT = 8080;
const httpServer = createServer(app);
const io = new Server(httpServer, {});
chatSocket(io);

httpServer.listen(process.env.PORT || PORT, () =>
  console.log("Servidor escuchando en Puerto: " + PORT)
);
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));

// CONFIGURACION APP
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PASSPORT //
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products-test", productosRouter);
app.use("/login", loginRouter);
app.use("/registro", signupRouter);
app.use("/logout", logoutRouter);
app.use("/home", homeRouter);

// EJS PLANTILLA //
app.set("view engine", "ejs");
app.set("views", "./views");

// APP //
app.all("*", (req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.get("/", (req, res) => {
  res.redirect("/login");
});

// REDIS //
const client = redis.createClient({ legacyMode: true });
client.connect();
const RedisStore = connectRedis(session);

app.use(
  session({
    store: new RedisStore({ host: "localhost", port: 8080, client, ttl: 300 }),
    secret: "topsecret",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 43200000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  req.session.touch();
  next();
});
// function checkAuthentication(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/login");
//   }
// }
// app.get("/ruta-protegida", checkAuthentication, (req, res) => {
//   const { username, password } = req.user;
//   const user = { username, password };
//   res.send("<h1>Ruta ok!</h1>" + JSON.stringify(user));
// });
// LOGIN//


// CONEXION BD MONGO //
mongoose
	.connect("mongodb://localhost:27017/ecommerce")
	.then(console.log("Conectado a la BD Mongo"));

// PASSPORT  LOGIN//
passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log("No se encuentra el usuario " + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log("Password invalida");
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// PASSPORT  SIGNUP//
passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (error, user) {
        if (error) {
          console.log("Error al registrarse: " + error);
          return done(error);
        }
        if (user) {
          console.log("Ese nombre de usuarix ya existe");
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, user) => {
          if (err) {
            console.log("Error al guardar usuario: " + err);
            return done(err);
          }
          console.log("Registro existoso");
          return done(null, user);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});



// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://admin:admin123@ecommerce.nflhe41.mongodb.net/?retryWrites=true&w=majority",
// 			useNewUrlParser: true, 
// 			useUnifiedTopology: true
//     }),
//     secret: "secreto",
//     cookie: { maxAge: 600000 },
//     resave: false,
//     saveUninitialized: false,
//   })
// );


app.get("/logout", (req, res) => {
  let username = req.session.username;
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.render("pages/logout", { name: username });
  });
});



