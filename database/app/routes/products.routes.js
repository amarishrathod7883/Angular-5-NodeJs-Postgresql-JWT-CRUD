module.exports = app => 
{

  var multer = require('multer');

  let storage = multer.diskStorage({
    destination: function (req, file, cb) 
    {
      cb(null, '../src/assets/uploads/' + req.body.uploadpath + '/');
    },
    filename: function (req, file, cb) 
    {
      var datetimestamp = Date.now();
      var ext = file.originalname.split('.').pop();
      cb(null, datetimestamp + '.' + ext);
    }
  });

  let upload = multer({ storage: storage });

  const authJwt  = require("../middlewares/authJwt");
  const products = require("../controllers/products.controller.js");

  var router = require("express").Router();

  app.use(function(req, res, next) 
  {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Product
  router.post("/", [authJwt.verifyToken], upload.single('product_image'), products.create);

  // Retrieve all Products
  router.get("/", [authJwt.verifyToken], products.findAll);

  // Retrieve all Products Category
  router.get("/getproductcategory", [authJwt.verifyToken], products.findAllProductCategory);

  // Retrieve Filter Product
  router.post("/getproductfilter", [authJwt.verifyToken], products.findAllProductFilter);

  // Retrieve a single Product with id
  router.get("/:id", [authJwt.verifyToken], products.findOne);

  // Delete a Product with id
  router.delete("/:id", [authJwt.verifyToken], products.delete);

  // Update a Product with id
  router.put("/:id", [authJwt.verifyToken], upload.single('product_image'), products.update);

  app.use("/api/products", router);
};
