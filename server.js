import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";
import {chatSocket} from "./src/utils/socketChat.js";
import {homeRouter, productRouter, loginRouter } from "./routes/index.js";
import MongoStore from "connect-mongo";

// SERVIDOR EXPRESS //
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
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:admin123@ecommerce.nflhe41.mongodb.net/?retryWrites=true&w=majority",
			useNewUrlParser: true, 
			useUnifiedTopology: true
    }),
    secret: "secreto",
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/api/products-test", productRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);

app.use((req, res, next) => {
  req.session.touch();
  next();
});

app.get("/", (req, res) => {
  res.send("Bienvenidx");
});

app.get("/logout", (req, res) => {
  let username = req.session.username;
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.render("pages/logout", { name: username });
  });
});



