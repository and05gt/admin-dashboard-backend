import { model, Schema } from 'mongoose';

const supplierSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    suppliers: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true, enum: ['Active', 'Deactive'] },
  },
  {
    versionKey: false,
  },
);

export const SuppliersCollection = model('suppliers', supplierSchema);
