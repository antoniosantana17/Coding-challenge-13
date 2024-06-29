// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://course-api.com/react-store-products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { name, image, price, description } = products[currentIndex];

  return (
    <div className="App">
      <h1>Product Display</h1>
      <div className="product-container">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <button onClick={prevProduct}>Previous</button>
        <button onClick={nextProduct}>Next</button>
      </div>
    </div>
  );
}

export default App;

const fetchProducts = async () => {
    try {
      const response = await fetch('https://course-api.com/react-store-products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  