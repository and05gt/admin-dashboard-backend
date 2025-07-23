import Joi from 'joi';

export const createProductSchema = Joi.object({
  photo: Joi.string().optional(),
  name: Joi.string().required(),
  suppliers: Joi.string().required(),
  stock: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string()
    .valid(
      'Medicine',
      'Head',
      'Heart',
      'Hand',
      'Leg',
      'Dental Care',
      'Skin Care',
      'Eye Care',
      'Vitamins & Supplements',
      'Orthopedic Products',
      'Baby Care',
    )
    .required(),
});
