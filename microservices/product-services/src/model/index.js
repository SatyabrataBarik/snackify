import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true, 
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    }
  
} });


const Product = mongoose.model("Product", productSchema);

export default Product;