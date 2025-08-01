import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    photo: { type: String },
    name: { type: String, required: true },
    suppliers: { type: String, required: true },
    stock: { type: String, required: true },
    price: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
  },
  {
    versionKey: false,
  },
);

export const ProductsCollection = model('products', productSchema);
