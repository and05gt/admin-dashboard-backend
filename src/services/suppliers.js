import { SORT_ORDER } from '../constants/index.js';
import { SuppliersCollection } from '../db/models/supplier.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllSuppliers = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const suppliersQuery = SuppliersCollection.find();
  const suppliersCount = await SuppliersCollection.find()
    .merge(suppliersQuery)
    .countDocuments();

  const suppliers = await suppliersQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(suppliersCount, page, perPage);

  return { data: suppliers, ...paginationData };
};

export const createSupplier = async (payload) => {
  const supplier = await SuppliersCollection.create(payload);
  return supplier;
};

export const updateSupplier = async (supplierId, payload, options = {}) => {
  const result = await SuppliersCollection.findOneAndUpdate(
    {
      _id: supplierId,
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
    supplier: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};
