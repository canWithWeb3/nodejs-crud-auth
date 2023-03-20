const express = require("express")
const Category = require("../models/category")
const Product = require("../models/product")
const router = express.Router()

// products start
router.get("/products/:productId/delete", async (req, res) => {
  const product = await Product.deleteOne({ _id: req.params.productId });
  res.redirect("/admin/products");
})

router.post("/products/:productId/edit", async (req, res) => {
  const { name, description, category } = req.body

  const product = await Product.findById({ _id: req.params.productId });

  product.name = name
  product.description = description
  product.category = category

  try{
    const updatedProduct = await product.save();
    console.log("update: " +updatedProduct)
  }catch(err){
    console.log("update error: " + err)
  }

  res.redirect("/admin/products")
})

router.get("/products/:productId/edit", async (req, res) => {
  const product = await Product.findById({ _id: req.params.productId }).populate("category");
  const categories = await Category.find();
  console.log(product)
  res.render("admin/edit-product", { product: product, categories: categories})
})

router.post("/products/create", async (req, res) => {
  const newProduct = new Product(req.body)
  console.log(req.body)

  try{
    const result = await newProduct.save()
    console.log(result)
  }catch(err){
    console.log(err)
  }
  
  res.redirect("/admin/products")
})

router.get("/products/create", async (req, res) => {
  const categories = await Category.find();
  res.render("admin/create-product", { categories: categories })
})

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.render("admin/products", { products: products })
})
// products finish

// categories start
router.get("/categories/:categoryId/delete", async (req, res) => {
  const category = await Category.deleteOne({ _id: req.params.categoryId });
  res.redirect("/admin/categories");
})

router.post("/categories/:categoryId/edit", async (req, res) => {
  const { name } = req.body

  const category = await Category.findById({ _id: req.params.categoryId });

  category.name = name

  try{
    const updatedProduct = await category.save();
  }catch(err){
    console.log(err)
  }

  res.redirect("/admin/categories")
})

router.get("/categories/:categoryId/edit", async (req, res) => {
  const category = await Category.findById({ _id: req.params.categoryId });
  res.render("admin/edit-category", category)
})

router.post("/categories/create", async (req, res) => {
  const newCategory = new Category(req.body)

  try{
    const result = await newCategory.save()
    console.log(result)
  }catch(err){
    console.log(err)
  }
  
  res.redirect("/admin/categories")
})

router.get("/categories/create", (req, res) => {
  res.render("admin/create-category")
})

router.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.render("admin/categories", { categories: categories })
})
// categories finish

module.exports = router;