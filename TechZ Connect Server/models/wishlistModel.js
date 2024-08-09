const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    user_id : String,
    products: [{
        product_id: String
    }]
})

const Wishlist = mongoose.model('wishlist', wishlistSchema);
module.exports = Wishlist;