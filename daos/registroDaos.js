export const registroDaos = {
  get: (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.redirect("/home");
      } else {
        res.render("pages/registro");
      }
    } catch (error) {
      return res
        .status(500)
        .send({ status: "Get page Sign Up error", body: error });
    }
  },
  postsignup: (req, res) => {
    try {
      const { username } = req.user;
      req.session.username = username;
			console.log(username)
      res.redirect("/home");
    } catch (error) {
      return res.status(500).send({ status: "Error de registro", body: error });
    }
  },

  errorSignup: (req, res) => {
    try {
      res.render("pages/errorregistro");
    } catch (error) {
      res.status(500).send({ status: "Error de registro", body: error });
    }
  },
};
