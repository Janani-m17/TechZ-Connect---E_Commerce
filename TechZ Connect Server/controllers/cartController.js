const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
exports.createCart = async (req, res) => {
	const { user_id } = req.user;
	const { product_id, quantity } = req.body;
    let cart = await Cart.findOne({ user_id });

	if (!cart) {
		cart = new Cart({
			user_id,
			products: [
				{
					product_id,
					quantity,
				},
			],
		});
	}
    else{
	const productIndex = cart.products.findIndex(
		prod => prod.product_id === product_id
	);
	if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
	} else {
        cart.products.push({ product_id, quantity });
	}
}
	cart.save();
	res.status(200).json({ message: "Product updatd in cart", cart });
};

exports.getCart = async(req,res) => {
	const {user_id} = req.user;

	const cart = await Cart.findOne({user_id});
	if(!cart)
		return res.status(404).json({message: "Cart not found"});

	try{
		let subTotal = 0;
		const CartItems = await Promise.all(
			cart.products.map(async (product) => {
				const productDetails = await Product.findOne({
					id: product.product_id
			});

				subTotal += productDetails.price * product.quantity;
				return {
					product_id: productDetails.id,
					title: productDetails.title,
					description: productDetails.description,
					price: productDetails.price,
					image: productDetails.image,
					quantity: product.quantity
				}
			})
		)
		res.status(200).json({cartItems : CartItems, subTotal})
	}
	catch(error){
		res.status(500).json({message: "Server Error ", error})
	}
}

exports.deleteCart = async(req, res) => {

	const {user_id} = req.user;
	const product_id = req.params.id;
	
	try{

	const cart = await Cart.findOne({user_id});
	if(!cart)
		return res.status(404).json({message: "Cart not found"});

	const product = cart.products.find(
		(product) => product.product_id === product_id)
	if(!product)
		return res.status(404).json({message:"Product not found"})
    
	if(cart.products.length <= 1){
		await cart.deleteOne({user_id})
		return res.status(200).json({message: "Cart is empty therefore deleted."})
	}
	else{
	const product = cart.products.filter(
			(product) => product.product_id !== product_id
		)
	cart.products=product
	await cart.save();
	res.status(200).json({message: "Product deleted successfully"})
	}
} catch(error) {
	res.status(500).json({message: "Server Error"})
}
}