import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if backend is running
    const checkBackend = async () => {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('Backend status:', data);
      } catch (error) {
        console.error('Backend not available:', error);
      }
    };

    checkBackend();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>GlowIQ</h1>
          <h2>All you need to glow, in one place!</h2>
         
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>&copy; 2024 Skincare Website. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <section className="home-page">
      <h2>Welcome to Our Skincare Store</h2>
      <p>Discover premium skincare products for all skin types.</p>
    </section>
  );
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <section className="products-page">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </section>
  );
}

export default App;
