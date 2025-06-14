import { model, Schema } from 'mongoose';

const ordersSchema = new Schema({
  photo: { type: String },
  name: { type: String, required: true },
  address: { type: String, required: true },
  products: { type: String, required: true },
  price: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: [
      'Pending',
      'Processing',
      'Completed',
      'Shipped',
      'Delivered',
      'Confirmed',
      'Cancelled',
    ],
  },
  order_date: { type: String, required: true },
});

export const OrdersCollection = model('orders', ordersSchema);
