import React from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  const { rating } = product;
  const fullStars = Math.floor(rating.rate);
  const halfStar = rating.rate % 1 !== 0;

  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);
  const dispatch = useDispatch();

  const wishItems = useSelector((state) => state.wishlist.items);
  const isInWish = wishItems.some((item) => item.id === product.id);
  
  const handleAddToCart = () => { 
    dispatch(addToCart(product));
    toast("Product added to cart!");
    console.log(product);
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    console.log("Add", product);
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(product));
    console.log("Remove", product);
  };
  
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
        <div className='btndiv'>
          {isInWish ? (
            <button className='wishlist-btn red' onClick={handleRemoveFromWishlist}><FaHeart size={24} color='red' /></button>
          ) : (
            <button className='wishlist-btn' onClick={handleAddToWishlist}><FaRegHeart size={24} /></button>
          )}
          {isInCart ? (
            <Link to="/cart"><button className='btn'>Go to Cart</button></Link>
          ) : (
            <button className='btn' onClick={handleAddToCart}>Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
