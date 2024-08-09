const mongoose = require('mongoose');
const product = require('./productModel');

const orderSchema = new mongoose.Schema({

    user_id : String,
    user_email : String,
    username:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    products:[{
        product_id: String,
        quantity: Number
    }],
    orderedDate:{
        type: Date,
        default: Date.now
    },
    deliveryDate: Date,

})

orderSchema.pre('save', function(next) {
    if (!this.deliveryDate) {
        this.deliveryDate = new Date(this.orderedDate);
        this.deliveryDate.setDate(this.deliveryDate.getDate() + 7);
    }
    next();
});

const Order = mongoose.model('order',orderSchema);
module.exports = Order;