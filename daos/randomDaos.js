const { fork } = require("child_process");
const parseArgs = require("minimist");

const apiRandomDaos = {
  get: (req, res) => {
    try {
			const args = parseArgs(process.argv.slice(2));
      res.status(200).render("pages/random", {port: args !== undefined ? args.PORT : "",});
    } catch (error) {
      res.status(500).send({ error });
    }
  },
  post: (req, res) => {
		try {
      const cant = req.query.cant || 100000;
      const random = fork("./src/utils/random.js");
			console.log(cant)
      random.send({ message: "start", cant: cant });
      random.on("message", (obj) => {
        res.json(obj);
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  },
};

module.exports = {apiRandomDaos}