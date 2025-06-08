import createHttpError from 'http-errors';
import { getAllCustomers, getCustomerById } from '../services/customers.js';

export const getCustomersController = async (req, res) => {
  const customers = await getAllCustomers();

  res.json({
    status: 200,
    message: 'Successfully found customers!',
    data: customers,
  });
};

export const getCustomerByIdController = async (req, res) => {
  const { customerId } = req.params;
  const customer = await getCustomerById(customerId);

  if (!customer) {
    throw createHttpError(404, 'Customer not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found customer with id ${customerId}!`,
    data: customer,
  });
};
