import  mongoose from 'mongoose';

const Schema = mongoose.Schema;
const productSchema = new Schema({
  short: {
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
  },
  image0: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  image3: {
    type: String,
    required: true,
  },
  image4: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  }
  },
    {
      timestamps: true,
      toJSON: {
        transform: function (doc, ret) {
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.__v;
          delete ret._id;
          ret.id = doc._id;
      },
    }
  });

 export const ProductModel = mongoose.model('products', productSchema);
