import Product from "../models/products.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({
      message: "Product Added Sucessfully!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let products = await Product.find().select();
    console.log("Why am I here");
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const productByID = async (req, res) => {
  var id = req.params.id;
  try {
    let product = await Product.findOne({ _id: id });
    if (!product)
      return res.status(400).json({
        error: "product not found",
      });
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve product",
    });
  }
};

const remove = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeByID = async (req, res) => {
  var id = req.params.id;
  try {
    let product = await Product.findOneAndDelete({ _id: req.params.id });
    if (!product) {
      return res.status(400).send("Item not found");
    }
    return res.status(200).send("Id " + req.params.id + " has been deleted");
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default { create, productByID, remove, removeByID, list };
