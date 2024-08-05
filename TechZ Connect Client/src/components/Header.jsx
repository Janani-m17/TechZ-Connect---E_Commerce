import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";

const Header = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">🛍 TechZ Connect</div>
        <ul className="navbar-links">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/wishlist"><FaRegHeart /></Link></li>
          <li className="cart-badge">
            <Link to="/cart" >
            <BsCart3 />
              {/* {props.cart.length > 0 && <span>{props.cart.length}</span>} */}
              {/* {cartItems.length > 0 && <span>{cartItems.length}</span>} */}
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
