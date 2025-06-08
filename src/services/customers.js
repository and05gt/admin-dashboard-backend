import { CustomersCollection } from '../db/models/customer.js';

export const getAllCustomers = async () => {
  const customers = await CustomersCollection.find();
  return customers;
};

export const getCustomerById = async (customerId) => {
  const customer = await CustomersCollection.findOne({
    _id: customerId,
  });
  return customer;
};
