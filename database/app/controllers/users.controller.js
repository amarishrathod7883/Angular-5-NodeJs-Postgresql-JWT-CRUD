const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// User Registration
exports.register = (req, res) => 
{
  Users
  .findOne({where: {username: req.body.username}})
  .then(user => 
  {
    if (user) 
    {
      let content = {
        accessToken: null,
        status: 400,
        success: false,
        message: "Username is already in use!."
      };
      return res.send(content);
    }

    // Email
    Users
    .findOne({where: {email: req.body.email}})
    .then(userEmail => 
    {
      if (userEmail) 
      {
        let content = {
          accessToken: null,
          status: 400,
          success: false,
          message: "Email is already in use!."
        };
        return res.send(content);
      }

      // Save User to Database
      Users.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      })
      .then(user => 
      {
        var token = jwt.sign({ id: user.id }, 'products-app-super-shared-secret', {
          expiresIn: 86400 // 24 hours
        });

        let content = {
          data: user,
          accessToken: token,
          status: 200,
          success: true,
        };
        return res.send(content);
        //res.send({ message: "User was registered successfully!" });
      })
      .catch(err => 
      {
        let content = {
          data: err,
          accessToken: null,
          status: 500,
          success: false,
          message: err.message
        };
        return res.send(content);
      });
    });
  });
};

// User Login
exports.login = (req, res) => 
{
  Users.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => 
  {
    if (!user) 
    {
      let content = {
        accessToken: null,
        status: 404,
        success: false,
        message: "User Not found."
      };
      return res.send(content);
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) 
    {
      let content = {
        accessToken: null,
        status: 401,
        success: false,
        message: "Invalid Password!"
      };
      return res.send(content);
    }

    var token = jwt.sign({ id: user.id }, 'products-app-super-shared-secret', {
      expiresIn: 86400 // 24 hours
    });

    let content = {
      data: user,
      accessToken: token,
      status: 200,
      success: true,
    };
    return res.send(content);
  })
  .catch(err => 
  {
    let content = {
      data: err,
      accessToken: null,
      status: 500,
      success: false,
      message: err.message
    };
    return res.send(content);
  });
};