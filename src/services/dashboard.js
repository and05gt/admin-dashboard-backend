import { CustomersCollection } from '../db/models/customer.js';
import { IncomeExpensesCollection } from '../db/models/incomeExpenses.js';
import { ProductsCollection } from '../db/models/product.js';
import { SuppliersCollection } from '../db/models/supplier.js';

export const getDashboardData = async () => {
  const [
    productsCount,
    suppliersCount,
    customersCount,
    customers,
    incomeExpenses,
  ] = await Promise.all([
    ProductsCollection.countDocuments(),
    SuppliersCollection.countDocuments(),
    CustomersCollection.countDocuments(),
    CustomersCollection.find().limit(5).sort({ register_date: -1 }).exec(),
    IncomeExpensesCollection.find().limit(6).exec(),
  ]);

  return {
    allProducts: productsCount,
    allSuppliers: suppliersCount,
    allCustomers: customersCount,
    lastCustomers: customers,
    incomeExpenses: incomeExpenses,
  };
};
