// import "./App.css";
// import { useState } from "react";
// import Products from "./components/Products";
// import Header from "./components/Header";

// const App = () => {

//   const [cart, setCart] = useState([]);

//   return(
//     <>
//     <Header cart={cart}/>
//     <Products setCart={setCart} cart={cart}/>
//     </>
//   )
// }
// export default App;
import "./App.css";
import Products from "./components/Products";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from "./components/Wishlist";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/product/:productId" element={<ProductDetails/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
