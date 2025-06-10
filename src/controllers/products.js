import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../services/products.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getProductsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const products = await getAllProducts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });

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
