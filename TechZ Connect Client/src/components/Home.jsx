import React from 'react';
import '../App.css';
import Products from './Products';

const Home = () => {
  return (
    <div className="home-container">
      <div className="intro-section">
        <h1>Welcome to TechZ Connect</h1>
        <p>Your one-stop shop for the latest and greatest tech gadgets. Discover a wide range of products designed to enhance your digital lifestyle.</p>
      </div>
      
      <div className="highlights-section">
        <h2>Highlights</h2>
        <div className="highlights">
          <div className="highlight-item">
            <h3>New Arrivals</h3>
            <p>Explore the newest additions to our store, featuring cutting-edge technology and innovative designs.</p>
          </div>
          <div className="highlight-item">
            <h3>Best Sellers</h3>
            <p>Check out our most popular products, loved by tech enthusiasts around the globe.</p>
          </div>
          <div className="highlight-item">
            <h3>On Sale</h3>
            <p>Don't miss out on amazing deals and discounts on selected items.</p>
          </div>
        </div>
      </div>

      <div className="featured-products-section">
        <h2>Featured Products</h2>
        <Products/>
        </div>
    </div>
  );
};

export default Home;
