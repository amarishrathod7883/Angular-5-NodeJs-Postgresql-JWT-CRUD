module.exports = (sequelize, Sequelize) => {
  const ProductCatetgory = sequelize.define("product_catetgory", {
    category_name: {
      type: Sequelize.STRING
    },
  });

  return ProductCatetgory;
};
