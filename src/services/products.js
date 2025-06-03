import { ProductsCollection } from '../db/models/product.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();
  return products;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async (productId, payload, userId) => {
  const result = await ProductsCollection.findOneAndUpdate(
    {
      _id: productId,
      userId,
    },
    payload,
    { new: true },
  );
  return result;
};

export const deleteProduct = async (productId, userId) => {
  const result = await ProductsCollection.findOneAndDelete({
    _id: productId,
    userId,
  });
  return result;
};
