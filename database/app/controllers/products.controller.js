const db = require("../models");
const Product = db.products;
const ProductCategory = db.product_catetgory;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new Product
exports.create = (req, res) => 
{
  var created_at = new Date();
  
  const product = {
    product_name: req.body.product_name,
    category_id: req.body.category_id,
    description: req.body.description,
    price: req.body.price,
    product_image: (!!req.file || req.file != undefined) ? req.file.filename : '',
    createdAt: created_at,
    updatedAt: created_at,
  };

  // Save Product in the database
  Product.create(product)
  .then(data => 
  {
    res.send(data);
  })
  .catch(err => 
  {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Product."
    });
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => 
{
  const product_name = req.query.product_name;
  var condition = product_name ? { product_name: { [Op.iLike]: `%${product_name}%` } } : null;

  Product.findAll({ where: condition, include: [ProductCategory] })
  .then(data => 
  {
    res.send(data);
  })
  .catch(err => 
  {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving products."
    });
  });
};

// Find a single Product with an id
exports.findOne = (req, res) => 
{
  const id = req.params.id;
  Product.findByPk(id)
  .then(data => 
  {
    res.send(data);
  })
  .catch(err => 
  {
    res.status(500).send({
      message: "Error retrieving Product with id=" + id
    });
  });
};

// Update a Product by the id in the request
exports.update = (req, res) => 
{
  const id = req.params.id;
  var product_data = {
    product_name: req.body.product_name,
    description: req.body.description,
    category_id: req.body.category_id,
    price: req.body.price,
    updatedAt: new Date(),
  };

  if (req.file != undefined) 
  {
    product_data.product_image = req.file.filename
    if (!!req.body.product_image_old)
    {
      fs.exists('../src/assets/uploads/' + req.body.uploadpath + '/' + req.body.product_image_old, function (exists) 
      {
        if (exists) 
        {
          let fileName = '../src/assets/uploads/' + req.body.uploadpath + '/' + req.body.product_image_old;
          fs.unlinkSync(fileName);
        }
      });
    }
  }

  Product.update(product_data, 
  {
    where: { id: id }
  })
  .then(num => 
  {
    if (num == 1) 
    {
      res.send({
        message: "Product was updated successfully."
      });
    } 
    else 
    {
      res.send({
        message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
      });
    }
  })
  .catch(err => 
  {
    res.status(500).send({
      message: "Error updating Product with id=" + id
    });
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => 
{
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
  .then(num => 
  {
    if (num == 1) 
    {
      res.send({
        message: "Product was deleted successfully!"
      });
    } 
    else 
    {
      res.send({
        message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
      });
    }
  })
  .catch(err => 
  {
    res.status(500).send({
      message: "Could not delete Product with id=" + id
    });
  });
};

// find all Product Catergory
exports.findAllProductCategory = (req, res) => 
{
  ProductCategory.findAll()
  .then(data => 
  {
    res.send(data);
  })
  .catch(err => 
  {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving category."
    });
  });
};

// find all Product Filter
exports.findAllProductFilter = (req, res) => 
{
  Product
  .findAll({include: [ProductCategory], 
    order: [['price', req.body.orderby]]
  })
  .then(data => 
  {
    res.send(data);
  })
  .catch(err => 
  {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Product Filter."
    });
  });
};
