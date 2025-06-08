import { OrdersCollection } from '../db/models/order.js';

export const getAllOrders = async () => {
  const orders = await OrdersCollection.find();
  return orders;
};
