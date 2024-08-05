import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products as allProducts } from '../constants';
import '../App.css';

const Products = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const addItem = (item) => {
    console.log(item);
    props.setCart([...props.cart, item]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setFilteredProducts(
      allProducts.filter(product =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="quote-search-container">
        <blockquote className="quote">
          "Technology is best when it brings people together." – Matt Mullenweg
        </blockquote>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for products..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>
      <main className="show">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </>
  );
};

export default Products;
