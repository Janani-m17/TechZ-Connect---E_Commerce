import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function ProductDetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = products.find(product => product.id === Number(productId));
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log(product);
  };

  const { rating } = product;
  const fullStars = Math.floor(rating.rate);
  const halfStar = rating.rate % 1 !== 0;

  const briefdescLines = product.briefdesc.split('\n');

  return (
    <>
      <div className="opcard" key={product.id}>
        <div className='opcard-product'>
          <img className='opcard-img' src={product.image} alt={product.title} />
          <div className='opcart-info'>
            <h1>{product.title}</h1>
            <h3>{product.description}</h3>
            <ul className='briefdesc-list'>
              {briefdescLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
            <h6 className='cartcat'>{product.category}</h6>
            <p className="cartprice">Price: ₹{product.price}</p>
            <div className="oprating">
              <div className="stars">
                {[...Array(fullStars)].map((_, i) => <span key={i} className="star">★</span>)}
                {halfStar && <span className="star">✩</span>}
              </div>
              <span className="rate">({rating.count} Reviews)</span>
            </div>
            <div>
              {isInCart ? (
                <Link to="/cart"><button className='opbtn'>Go to Cart</button></Link>
              ) : (
                <button className='opbtn' onClick={handleAddToCart}>Add to Cart</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
