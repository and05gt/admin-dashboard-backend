import { model, Schema } from 'mongoose';

const incomeExpensesSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  type: { type: String, required: true, enum: ['Income', 'Expense', 'Error'] },
});

export const IncomeExpensesCollection = model(
  'income_expenses',
  incomeExpensesSchema,
);
