const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now
  },
  isActive: Boolean,
  category: [{ 
    type: Schema.Types.ObjectId,
    ref: "Category"
  }]
})

module.exports = mongoose.model("Product", productSchema) 