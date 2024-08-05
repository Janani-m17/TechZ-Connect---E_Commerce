import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { FaHeart } from "react-icons/fa6"; // Use FaHeart for a filled heart

function Wishlist() {
  const wishItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast("Product added to cart!");
    console.log(product);
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product));
    toast("Removed from Wishlist");
  }

  return (
    <div>
                          <h1> Here's your Wishlist...</h1>

   
    <div className="wishlist-container">
      {wishItems && wishItems.map(product => {
        const { rating } = product;
        const fullStars = Math.floor(rating.rate);
        const halfStar = rating.rate % 1 !== 0;
        const isInCart = cartItems.some((item) => item.id === product.id);

        return (
          <div className="card" key={product.id}>
            <div>
              <img src={product.image} alt={product.title} />
              <Link to={"/product/" + product.id} className='productlink'><h2>{product.title}</h2></Link>
              <h5>{product.description}</h5>
              <h6>{product.category}</h6>
              <p className="price">Price: ₹{product.price}</p>
              <div className="rating">
                <div className="stars">
                  {[...Array(fullStars)].map((_, i) => <span key={i} className="star">★</span>)}
                  {halfStar && <span className="star">✩</span>}
                </div>
                <span className="rate">({rating.count} Reviews)</span>
              </div>
              <div className='wishbtndiv'>
                <button className='removebtn' onClick={() => handleRemoveFromWishlist(product)}>
                  <FaHeart size={24} color='red' /> {/* Use FaHeart for filled heart */}
                </button>
                {isInCart ? (
                  <Link to="/cart"><button className='btn'>Go to Cart</button></Link>
                ) : (
                  <button className='btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default Wishlist;
