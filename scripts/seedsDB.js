require("dotenv").config();
const productData = require("../data/products");
const connectDB = require("../config/db");
const Product = require("../models/Product");

connectDB();

Product.deleteMany({})
  .then(() => Product.insertMany(productData))
  .then((data) => {
    console.log(data + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
