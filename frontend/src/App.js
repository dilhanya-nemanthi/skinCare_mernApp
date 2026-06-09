import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import mainImage from './utils/main_img1.png';

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
          <h1>𝙶𝚕𝚘𝚠𝙸𝚀</h1>
          <h2>𝒜𝓁𝓁 𝓎𝑜𝓊 𝓃𝑒𝑒𝒹 𝓉𝑜 𝑔𝓁𝑜𝓌, 𝒾𝓃 𝑜𝓃𝑒 𝓅𝓁𝒶𝒸𝑒!</h2>
         
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
      <div className="home-content">
        <img src={mainImage} alt="Main Skincare" className="home-image" />
        <div className="welcome-box">
          <h2>"𝘠𝘰𝘶𝘳 𝘴𝘬𝘪𝘯 𝘪𝘴 𝘵𝘩𝘦 𝘧𝘪𝘯𝘨𝘦𝘳𝘱𝘳𝘪𝘯𝘵 𝘰𝘧 𝘸𝘩𝘢𝘵 𝘪𝘴 𝘨𝘰𝘪𝘯𝘨 𝘰𝘯 𝘪𝘯𝘴𝘪𝘥𝘦 𝘺𝘰𝘶𝘳 𝘣𝘰𝘥𝘺, 𝘢𝘯𝘥 𝘢𝘭𝘭 𝘴𝘬𝘪𝘯 𝘤𝘰𝘯𝘥𝘪𝘵𝘪𝘰𝘯𝘴, 𝘧𝘳𝘰𝘮 𝘱𝘴𝘰𝘳𝘪𝘢𝘴𝘪𝘴 𝘵𝘰 𝘢𝘤𝘯𝘦 𝘵𝘰 𝘢𝘨𝘪𝘯𝘨, 𝘢𝘳𝘦 𝘵𝘩𝘦 𝘮𝘢𝘯𝘪𝘧𝘦𝘴𝘵𝘢𝘵𝘪𝘰𝘯𝘴 𝘰𝘧 𝘺𝘰𝘶𝘳 𝘣𝘰𝘥𝘺'𝘴 𝘪𝘯𝘵𝘦𝘳𝘯𝘢𝘭 𝘯𝘦𝘦𝘥𝘴, 𝘪𝘯𝘤𝘭𝘶𝘥𝘪𝘯𝘨 𝘪𝘵𝘴 𝘯𝘶𝘵𝘳𝘪𝘵𝘪𝘰𝘯𝘢𝘭 𝘯𝘦𝘦𝘥𝘴." — 𝘋𝘳. 𝘎𝘦𝘰𝘳𝘨𝘪𝘢𝘯𝘢 𝘋𝘰𝘯𝘢𝘥𝘪𝘰</h2>
        </div>
      </div>
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
