const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['moisturizer', 'cleanser', 'serum', 'sunscreen', 'mask', 'toner', 'other'],
    },
    image: String,
    stock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    skinType: [String], // e.g., ['oily', 'dry', 'combination', 'sensitive']
    ingredients: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
