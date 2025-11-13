import mongoose from 'mongoose'; // 1. CHANGE THIS

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a product name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please enter a category'],
    },
    size: {
      type: String,
      default: 'Per Kg',
    },
    price: {
      type: Number,
      required: [true, 'Please enter a price'],
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product; // 2. CHANGE THIS