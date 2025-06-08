import Joi from 'joi';

export const createSupplierSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  suppliers: Joi.string().required(),
  date: Joi.date().required(),
  amount: Joi.string().required(),
  status: Joi.string().valid('Active', 'Deactive').required(),
});
