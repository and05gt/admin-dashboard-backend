import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../services/products.js';
import createHttpError from 'http-errors';

export const getProductsController = async (req, res) => {
  const products = await getAllProducts();

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const createProductController = async (req, res) => {
  const product = await createProduct(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const upsertProductController = async (req, res, next) => {
  const { productId } = req.params;

  const result = await updateProduct(productId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Product not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a product!',
    data: result.product,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { productId } = req.params;

  const result = await deleteProduct(productId);

  if (!result) {
    next(createHttpError(404, 'Product not found'));
    return;
  }

  res.status(204).send();
};
