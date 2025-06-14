import { SORT_ORDER } from '../constants/index.js';
import { ProductsCollection } from '../db/models/product.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllProducts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = ProductsCollection.find();

  // if (filter.name) {
  //   productsQuery.where('name').equals(filter.name);
  // }

  if (filter.name) {
    const nameRegex = new RegExp(filter.name, 'i');
    productsQuery.where('name').regex(nameRegex);
  }

  const [productsCount, products] = await Promise.all([
    ProductsCollection.find().merge(productsQuery).countDocuments(),
    productsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, page, perPage);

  return {
    data: products,
    ...paginationData,
  };
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
