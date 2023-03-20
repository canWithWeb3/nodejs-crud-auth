const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.urlencoded({urlencoded: false}))
app.set("view engine", "ejs")

const path = require("path")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")

app.use("/libs", express.static(path.join(__dirname, "node_modules")))
app.use("/static", express.static(path.join(__dirname, "public")))

app.use("/admin", adminRoutes)
app.use(userRoutes)

mongoose.connect("mongodb+srv://aos-notes:aos-notes@clustermern.uchfose.mongodb.net/example?retryWrites=true&w=majority")
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connect error: ${err}`))



// const prd = new Product({
//   name: "Iphone 14",
//   price: 30000,
//   description: "İyi telefon",
//   imageUrl: "1.jpeg",
//   isActive: true
// })

// async function saveProduct(){
//   try{
//     const result = await prd.save()
//     console.log(result)
//   }catch(err){
//     console.log(err)
//   }
// }

// saveProduct()

app.listen(3000, () => console.log(`Server started listening on port: 3000`))