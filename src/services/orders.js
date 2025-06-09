import { SORT_ORDER } from '../constants/index.js';
import { OrdersCollection } from '../db/models/order.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllOrders = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const ordersQuery = OrdersCollection.find();
  const ordersCount = await OrdersCollection.find()
    .merge(ordersQuery)
    .countDocuments();

  const orders = await ordersQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(ordersCount, page, perPage);

  return { data: orders, ...paginationData };
};
