import { model, Schema } from 'mongoose';

const customerSchema = new Schema({
  image: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  spent: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  register_date: { type: String, required: true },
});

export const CustomersCollection = model('customers', customerSchema);
