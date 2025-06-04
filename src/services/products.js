import { ProductsCollection } from '../db/models/product.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();
  return products;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async (productId, payload, options = {}) => {
  const result = await ProductsCollection.findOneAndUpdate(
    {
      _id: productId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return {
    product: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteProduct = async (productId) => {
  const result = await ProductsCollection.findOneAndDelete({
    _id: productId,
  });
  return result;
};
