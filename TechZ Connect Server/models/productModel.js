const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id : String,
    title: String,
    description: String,
    briefdesc: String,
    price: Number,
    category: String,
    image: String,
    rating:{
        rate: Number,
        count: Number
    },
})

const product = new mongoose.model('Product',productSchema);
module.exports = product;