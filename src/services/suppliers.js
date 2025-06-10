import { SORT_ORDER } from '../constants/index.js';
import { SuppliersCollection } from '../db/models/supplier.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllSuppliers = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const suppliersQuery = SuppliersCollection.find();

  if (filter.name) {
    suppliersQuery.where('name').equals(filter.name);
  }

  const [suppliersCount, suppliers] = await Promise.all([
    SuppliersCollection.find().merge(suppliersQuery).countDocuments(),
    suppliersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

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
