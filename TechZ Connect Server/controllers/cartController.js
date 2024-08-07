const Cart = require("../models/cartModel");

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

