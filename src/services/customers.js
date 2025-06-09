import { SORT_ORDER } from '../constants/index.js';
import { CustomersCollection } from '../db/models/customer.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllCustomers = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const customersQuery = CustomersCollection.find();
  const customersCount = await CustomersCollection.find()
    .merge(customersQuery)
    .countDocuments();

  const customers = await customersQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(customersCount, page, perPage);

  return {
    data: customers,
    ...paginationData,
  };
};

export const getCustomerById = async (customerId) => {
  const customer = await CustomersCollection.findOne({
    _id: customerId,
  });
  return customer;
};
