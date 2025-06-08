import { SuppliersCollection } from '../db/models/supplier.js';

export const getAllSuppliers = async () => {
  const suppliers = await SuppliersCollection.find();
  return suppliers;
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
