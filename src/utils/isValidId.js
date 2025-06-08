import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidProductId = (req, res, next) => {
  const { productId } = req.params;

  if (!isValidObjectId(productId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};

export const isValidSupplierId = (req, res, next) => {
  const { supplierId } = req.params;

  if (!isValidObjectId(supplierId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};

export const isValidCustomerId = (req, res, next) => {
  const { customerId } = req.params;

  if (!isValidObjectId(customerId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};
