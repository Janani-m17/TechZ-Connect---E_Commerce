const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");

exports.createWishlist = async(req,res) => {
    const {user_id} = req.user;
    const product_id = req.params.id;
    
    try{
    let wishlist = await Wishlist.findOne({user_id});
    
    if(!wishlist){
        wishlist = new Wishlist({
            user_id,
            products: [{product_id}]
        })
    }
    else{
    const productIndex = wishlist.products.findIndex(
        (prod) => prod.product_id === product_id
    );
    if (productIndex !== -1) {
        return res.status(401).json({ message: 'Product already exists in wishlist' });
    }

    wishlist.products.push({product_id})
}

    await wishlist.save();
    return res.status(200).json({ message: "Product added to wishlist", wishlist});

} catch(error){
	return res.status(500).json({message: "Server Error",error})
}

}

exports.deleteWishlist = async(req,res) => {

    const {user_id} = req.user;
    const product_id = req.params.id;

    try{

        const wishlist = await Wishlist.findOne({user_id})
        if(!wishlist)
            res.status(404).json({message:"Wishlist not found"})

        const product = wishlist.products.find(
            (product) => product.product_id === product_id)
        if(!product)
            return res.status(404).json({message:"Product not found"})

        if(wishlist.products.length <= 1){
            await wishlist.deleteOne({user_id})
            return res.status(200).json({message: "Wishlist deleted successfully."})
        }
        else{
        const product = wishlist.products.filter(
                (product) => product.product_id !== product_id
            )
        wishlist.products=product
        await wishlist.save();
        res.status(200).json({message: "Product removed from wishlist successfully"})
        }
    } 
    catch(error){
        res.status(500).json({message:"Server error"})
    }
}

exports.getWishlist = async (req, res) => {
    const { user_id } = req.user;

    try {
        // Find the wishlist for the user
        const wishlist = await Wishlist.findOne({ user_id });

        // Check if wishlist exists
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        // Populate product details for each item in the wishlist
        const wishlistItems = await Promise.all(
            wishlist.products.map(async (product) => {
                const productDetails = await Product.findOne({
                    id: product.product_id // Match by product_id
                });

                // Check if product details were found
                if (!productDetails) {
                    return res.status(404).json({ message: `Product not found for ID: ${product.product_id}` });
                }

                // Return the product details
                return {
                    product_id: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    image: productDetails.image
                };
            })
        );

        // Respond with the populated wishlist items
        res.status(200).json({ wishlistItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};