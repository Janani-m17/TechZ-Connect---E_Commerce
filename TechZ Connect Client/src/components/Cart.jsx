import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../App.css"
import { incrementItem,decrementItem, removeItem } from '../redux/cartSlice';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch()

  // const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   let sum=0;
  //   cartItems.forEach((item) => {
  //       sum +=  item.price * item.quantity;
  //   });
  //   setTotal(sum);
  // },[cartItems])

  const total = useMemo(() => {
    let sum = 0
    cartItems.forEach((item) => {
      sum += item.quantity * item.price
    });
    return sum;
  },[cartItems])

  const handleIncrement = (item) => {
    dispatch(incrementItem(item))
  }
  const handleDecrement = (item) => {
    dispatch(decrementItem(item))
  }
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const deliveryfee = 40;

  console.log(cartItems)
  if(cartItems.length === 0)
    return <p>Cart is Empty</p>

  return (
    <div className='cartpage'>
    <div className='cartdiv'>
        {cartItems && 
        cartItems.map(x => (
    
    <div className="cartcard" key={x.id}>
        <img className='cart-img' src={x.image} alt={x.title} />
        <div className='cart-info'>
        <h2>{x.title}</h2>
        {/* <h5>{x.description}</h5> */}
        <h6 className='cartcat'>{x.category}</h6>
        <p className="cartprice">Price: ₹{x.price}</p>
        <div className='addless'>
            <button onClick={() => handleDecrement(x)}>-</button> 
            {x.quantity} 
            <button onClick={() => handleIncrement(x)}>+</button></div>
        <button className="cartbtn" onClick={()=>handleRemove(x)}>Remove from Cart</button>
        </div>
    </div>
        ))}
        </div>
          <div className="checkout">
                <h2>Price Details</h2>
                    <p>SubTotal: ₹{total}</p>
                    <p>Delivery Fees: {deliveryfee}</p>
                    <p className='cartprice'>Total: ₹{total + deliveryfee}</p>
                    <button className='checkout-btn'>Checkout</button>
            </div>
    </div>
  )
}

export default Cart