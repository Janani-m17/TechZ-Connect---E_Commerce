const Product = require("../models/productModel");
const { v4: uuidv4} = require('uuid');

exports.getProducts = async (req,res) => {

    try{
        const products = await Product.find()
        res.send(products)
    }
    catch(error){
        console.log(error)
    }
}

exports.createProduct = async (req,res) => {

    try{
    const {title, description, briefdesc, price, category, rating, image} = req.body;
    const product = new Product({
        id: uuidv4(),
        title,
        description,
        briefdesc,
        price,
        category,
        rating,
        image
    })
    await product.save();
    res.status(200).json("Product Created Successfully")}
    catch(error){
        console.log(error)
    }
}

exports.updateProduct = async(req,res) => {

    const {id} = req.params;
    const {title, category, description, briefdesc, rating, price,image} = req.body;
    try{
        const updateProduct = await Product.findOneAndUpdate(
            {id : id},
            {title, category, description, briefdesc, price, rating, image},
            {new : true},
        );
        if(!updateProduct)
            return res.status(404).json('Product not found');

        res.status(200).json('Product updated successfully')
    }
    catch(error){
        console.log(error)
    }
}

exports.deleteProduct = async(req,res) => {

    const {id} = req.params;
    try{
        const deleteProduct = await Product.findOneAndDelete({id:id})
        if(!deleteProduct)
            return res.status(404).json('Product not found')
        res.status(200).json('Product deleted successfully')
    }
    catch(error){
        console.log(error)
    }
}

