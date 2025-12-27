// model/cart.js
const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductDatabase",
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [CartItemSchema],

    totalPrice: {
      type: Number,
      default: 0
    },

    totalItems: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Cartdatabase=mongoose.model("Cartdatabase",CartSchema);
module.exports=Cartdatabase;