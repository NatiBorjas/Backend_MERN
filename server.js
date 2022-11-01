import express from "express";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import {chatSocket} from "./src/utils/socketChat.js";
import {homeRouter, productosRouter, loginRouter, logoutRouter,signupRouter  } from "./routes/index.js";

// SERVIDOR EXPRESS Y SOCKETS//
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = createServer(app);
const io = new Server(httpServer, {});
chatSocket(io);

// PASSPORT //
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import redis from "redis";
import connectRedis from "connect-redis";
import mongoose from "mongoose";
import Usuarios from "./models/usuariosSchema.js";
import { isValidPassword, createHash } from "./src/utils/passwordsFunctions.js";

// CONFIGURACION APP
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONEXION BD MONGO //
mongoose
	.connect("mongodb+srv://admin:admin123@ecommerce.nflhe41.mongodb.net/?retryWrites=true&w=majority",
		{ useNewUrlParser: true })
	.then(console.log("Conectado a la BD Mongo"));

// EJS PLANTILLA //
app.set("view engine", "ejs");
app.set("views", "./views");

// PASSPORT LOGIN//
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
          console.log("Ese usuarix ya existe");
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

// MIDDLEWARES PASSPORT
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  req.session.touch();
  next();
});

//INICIO SERVIDOR
httpServer.listen(PORT, () => console.log("Servidor escuchando en Puerto: " + PORT));
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));

// RUTAS

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/api/products-test", productosRouter);
app.use("/login", loginRouter);
app.use("/registro", signupRouter);
app.use("/logout", logoutRouter);
app.use("/home", homeRouter);

app.all("*", (req, res) => {
  res.status(404).send("Ruta no encontrada");
});


