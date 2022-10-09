import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import routerApi from "./routes/productosApi.js";

// SERVIDOR EXPRESS //
const app = express();
const PORT = 8080;
const httpServer = createServer(app);
const io = new Server(httpServer, {});

httpServer.listen(process.env.PORT || PORT, () =>
  console.log("Servidor Funcionando en Puerto: " + PORT)
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

app.use("/api/products-test", routerApi);

app.use("/", (req, res) => {
  res.render("pages/home");
});

// SOCKETS
import { socketModel } from "./src/utils/socket.js";
socketModel(io);

