const express = require("express")
const app = express();
const productRoutes = require("./routes/productRoutes")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes");
const wishRoutes = require("./routes/wishlistRoutes")
const orderRoutes = require("./routes/orderRoutes")

mongoose.connect(
    "mongodb://localhost:27017/TechZ_Connect_DB"
    // "mongodb+srv://jananim2022cce:janani@cluster0.mawxsz6.mongodb.net/TechZ_Connect_DB"
).then(()=>{
    console.log("Connect to DB");
})

app.use(express.json())
app.use('/products',productRoutes);
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/wishlist',wishRoutes);
app.use('/order',orderRoutes);

app.listen(3000, () => {
    console.log("Server running at port 3000");
})