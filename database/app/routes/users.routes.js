module.exports = app => 
{

  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // User login
  router.post("/login", users.login);

  // User Registration
  router.post("/register", users.register);

  app.use("/api/users", router);
};
