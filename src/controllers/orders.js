import { getAllOrders } from '../services/orders.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getOrdersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);

  const orders = await getAllOrders({
    page,
    perPage,
    sortOrder,
    sortBy,
  });

  res.json({
    status: 200,
    message: 'Successfully found orders!',
    data: orders,
  });
};
