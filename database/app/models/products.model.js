module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("products", {
    product_name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.NUMERIC
    },
    category_id: {
      type: Sequelize.INTEGER
    },
    product_image: {
      type: Sequelize.STRING
    }
  });

  return Products;
};
