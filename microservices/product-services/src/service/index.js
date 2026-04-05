import * as productRepo from '../repository/index.js';
export const getProduct = async (page, limit) => {
  const product = await productRepo.getProducts(page, limit);
  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};