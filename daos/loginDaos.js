export const loginDaos = {
  // auth: (req, res, next) => {
  //   if (req.session.username != undefined) {
  //     return next();
  //   }
  //   return res.status(401).render("pages/errorLogin");
  // },
  // get: (req, res) => {
  //   try {
  //     if (req.is) {
  //       res.render("pages/home", { name: req.session.username });
  //     } else {
  //       res.render("pages/login");
  //     }
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .send({ status: "Get page Log In error", body: error });
  //   }
  // },

  get: (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.redirect("/home");
      } else {
        res.render("pages/login");
      }
    } catch (error) {
      return res
        .status(500)
        .send({ status: "Get page Log In error", body: error });
    }
  },

  postLogin: (req, res) => {
    try {
      const { username } = req.body;
      req.session.username = username;
      res.redirect("/home");
    } catch (error) {
      return res.status(500).send({ status: "Log In error", body: "error" });
    }
  },

	errorLogin: (req, res) => {
    try {
      res.render("pages/errorLogin");
    } catch (error) {
      res.status(500).send({ status: "Log In error", body: error });
    }
  },
};
