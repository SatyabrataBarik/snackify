// repositories/productRepository.js
import Product from "../model/index.js";

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const getProducts = async (page, limit) => {
  return await Product.find().skip((page - 1) * limit).limit(limit);
};

export const getProductById = async (id) => {
  return await Product.findById(id);
};