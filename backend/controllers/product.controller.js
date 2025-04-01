import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const postProduct = async (req, res) => {
  const product = req.body; //user will send the data to this
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in Create product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const postProducts = async (req, res) => {
  const products = req.body; // Gelen tüm ürünler dizisini alıyoruz

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide an array of products" });
  }
  const newProducts = await Product.insertMany(products); // Çoklu ürün kaydetmek için tüm ürünleri birden kaydedeceğiz
  try {
    // insertMany() ile birden fazla ürün ekleyebiliriz
    res.status(201).json({ success: true, data: newProducts });
  } catch (error) {
    console.log("Error in Create products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const putProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ succes: false, message: "Invalid Product Id" });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!updateProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    res.status(500).json({ succes: false, message: "Server Error" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ succes: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error by delete method : /api/products/:id", error);

    res.status(500).json({ success: false, message: "Server error ! " });
  }
};
