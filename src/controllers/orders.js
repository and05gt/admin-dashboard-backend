import { getAllOrders } from '../services/orders.js';

export const getOrdersController = async (req, res) => {
  const orders = await getAllOrders();

  res.json({
    status: 200,
    message: 'Successfully found orders!',
    data: orders,
  });
};
