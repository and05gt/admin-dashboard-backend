import createHttpError from 'http-errors';
import {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
} from '../services/suppliers.js';

export const getSuppliersController = async (req, res) => {
  const suppliers = await getAllSuppliers();

  res.json({
    status: 200,
    message: 'Successfully found suppliers!',
    data: suppliers,
  });
};

export const createSupplierController = async (req, res) => {
  const supplier = await createSupplier(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a supplier!',
    data: supplier,
  });
};

export const upsertSupplierController = async (req, res, next) => {
  const { supplierId } = req.params;

  const result = await updateSupplier(supplierId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Supplier not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a supplier!',
    data: result.supplier,
  });
};
