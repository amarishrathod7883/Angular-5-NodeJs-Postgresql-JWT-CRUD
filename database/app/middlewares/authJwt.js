const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => 
{
  let token = req.headers["x-access-token"];

  if (!token) 
  {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, 'products-app-super-shared-secret', (err, decoded) => 
  {
    if (err) 
    {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

