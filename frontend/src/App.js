import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './styles/App.css';
import mainImage from './utils/main_img1.png';
import bannerImage from './utils/image1.webp';
import botImage from './utils/bot_image.jpg';
import HomeRemedies from './pages/HomeRemedies';
import Products from './pages/Products';
import Payment from './pages/Payment';


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('glowiq_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  useEffect(() => {
    localStorage.setItem('glowiq_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    setCart((prevCart) => {
      const productId = product.id || product._id;
      const existingItem = prevCart.find(item => {
        const itemId = item.product.id || item.product._id;
        return itemId === productId;
      });

      if (existingItem) {
        return prevCart.map(item => {
          const itemId = item.product.id || item.product._id;
          return itemId === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => (item.product.id || item.product._id) !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart(prevCart => 
      prevCart.map(item => {
        const id = item.product.id || item.product._id;
        if (id === productId) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

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
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/products">Products</NavLink></li>
              <li><NavLink to="/Home-rem">Home Remedies</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
          <div className="nav-cart-container">
            <button className="nav-cart-trigger" onClick={() => setIsCartOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Shopping Cart</span>
              {totalCartCount > 0 && <span className="nav-cart-badge">{totalCartCount}</span>}
            </button>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products 
              cart={cart} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity} 
              setIsCartOpen={setIsCartOpen}
            />} />
            <Route path="/Home-rem" element={<HomeRemedies />} />
            <Route path="/payment" element={<Payment 
              cart={cart} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity} 
              clearCart={clearCart} 
            />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>&copy; 2024 Skincare Website. All rights reserved.</p>
        </footer>

        {/* Global Cart Drawer */}
        {isCartOpen && (
          <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="cart-header">
                <h3>Your Shopping Cart</h3>
                <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
              </div>

              <div className="cart-items-list">
                {cart.length > 0 ? (
                  cart.map((item) => {
                    const id = item.product.id || item.product._id;
                    return (
                      <div key={id} className="cart-item">
                        <div className="cart-item-icon">
                          {item.product.category === 'cleanser' && '🧼'}
                          {item.product.category === 'serum' && '🧪'}
                          {item.product.category === 'moisturizer' && '🧴'}
                          {item.product.category === 'sunscreen' && '☀️'}
                          {item.product.category === 'toner' && '💦'}
                          {item.product.category === 'mask' && '🎭'}
                        </div>
                        
                        <div className="cart-item-info">
                          <h4>{item.product.name}</h4>
                          <span className="cart-item-price">${item.product.price.toFixed(2)}</span>
                          
                          <div className="cart-quantity-controls">
                            <button onClick={() => updateQuantity(id, -1)}>&minus;</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(id, 1)}>+</button>
                          </div>
                        </div>

                        <button 
                          className="remove-item-btn" 
                          onClick={() => removeFromCart(id)}
                        >
                          &times;
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="cart-empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p>Your cart is empty. Add some GlowIQ clinical essentials!</p>
                  </div>
                )}
              </div>

              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal:</span>
                  <span className="subtotal-amount">${totalCartPrice.toFixed(2)}</span>
                </div>
                {cart.length > 0 ? (
                  <Link 
                    to="/payment"
                    className="checkout-btn"
                    onClick={() => setIsCartOpen(false)}
                    style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}
                  >
                    Proceed to Checkout
                  </Link>
                ) : (
                  <button 
                    className="checkout-btn" 
                    disabled
                  >
                    Proceed to Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <section className="home-page">
      <div className="banner-container">
        <img src={bannerImage} alt="Banner" className="banner-image" />
        <div className="banner-text-box">
          <h2>Welcome to <strong>Glow IQ</strong></h2>
          <p>Where skincare meets science and simplicity. Discover the secrets to a radiant complexion by learning how to build the perfect routine, exploring products that actually work, and decoding the ingredients your skin craves. Smart skincare, simplified.</p>
          <div className="banner-buttons">
            <Link to="/products" className="btn btn-primary">All Products</Link>
            <Link to="/Home-rem" className="btn btn-primary">Home Remedies</Link>
          </div>
        
          
        </div>
        
      </div>
      <div className="home-content">
        <img src={mainImage} alt="Main Skincare" className="home-image" />
        <div className="welcome-box">
          <h2>"𝘠𝘰𝘶𝘳 𝘴𝘬𝘪𝘯 𝘪𝘴 𝘵𝘩𝘦 𝘧𝘪𝘯𝘨𝘦𝘳𝘱𝘳𝘪𝘯𝘵 𝘰𝘧 𝘸𝘩𝘢𝘵 𝘪𝘴 𝘨𝘰𝘪𝘯𝘨 𝘰𝘯 𝘪𝘯𝘴𝘪𝘥𝘦 𝘺𝘰𝘶𝘳 𝘣𝘰𝘥𝘺, 𝘢𝘯𝘥 𝘢𝘭𝘭 𝘴𝘬𝘪𝘯 𝘤𝘰𝘯𝘥𝘪𝘵𝘪𝘰𝘯𝘴, 𝘧𝘳𝘰𝘮 𝘱𝘴𝘰𝘳𝘪𝘢𝘴𝘪𝘴 𝘵𝘰 𝘢𝘤𝘯𝘦 𝘵𝘰 𝘢𝘨𝘪𝘨, 𝘢𝘳𝘦 𝘵𝘩𝘦 𝘮𝘢𝘯𝘪𝘧𝘦𝘴𝘵𝘢𝘵𝘪𝘰𝘯𝘴 𝘰𝘧 𝘺𝘰𝘶𝘳 𝘣𝘰𝘥𝘺'𝘴 𝘪𝘯𝘵𝘦𝘳𝘯𝘢𝘭 𝘯𝘦𝘦𝘥𝘴, 𝘪𝘯𝘤𝘭𝘶𝘥𝘪𝘯𝘨 𝘪𝘵𝘴 𝘯𝘶𝘵𝘳𝘪𝘵𝘪𝘰𝘯𝘢𝘭 𝘯𝘦𝘦𝘥𝘴." — 𝘋𝘳. 𝘎𝘦𝘰𝘳𝘨𝘪𝘢𝘯𝘢 𝘋𝘰𝘯𝘢𝘥𝘪𝘰</h2>
        </div>
      </div>
      <div className="bot-content">
        <div className="welcome-box bot-advice-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ textAlign: 'center' }}>𝙶𝚎𝚝 𝚢𝚘𝚞𝚛 𝚙𝚎𝚛𝚜𝚘𝚗𝚊𝚕𝚒𝚣𝚎𝚍 𝚜𝚔𝚒𝚗 𝚊𝚍𝚟𝚒𝚌𝚎𝚜 𝚠𝚒𝚝𝚑 𝚘𝚞𝚛 𝙰𝙸 𝙰𝚜𝚜𝚒𝚜𝚝𝚊𝚗𝚝.</h2>
          <button className="btn btn-primary" style={{ width: '200px' }}>Get Started</button>      
        </div>
        <img src={botImage} alt="GlowIQ Assistant Bot" className="home-image bot-image" />
      </div>
    </section>
  );
}



function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="contact-page">
      <h2>Contact Us</h2>
      <p>Have questions about a routine or remedy? We would love to hear from you.</p>
      
      {submitted ? (
        <div className="success-banner" style={{ backgroundColor: '#fff', border: '1px solid #FFB6C1', padding: '20px', borderRadius: '8px', margin: '20px auto', maxWidth: '400px' }}>
          <h4 style={{ color: '#ff6b9d', margin: '0 0 10px 0' }}>Message Sent!</h4>
          <p style={{ color: '#666', margin: 0 }}>Thank you for reaching out. We will get back to you soon.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#555', fontWeight: '500' }}>Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#555', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ color: '#555', fontWeight: '500' }}>Message</label>
            <textarea 
              rows="4" 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})} 
              required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', resize: 'vertical' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Send Message</button>
        </form>
      )}
    </section>
  );
}

export default App;
