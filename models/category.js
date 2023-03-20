const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Category", CategorySchema)