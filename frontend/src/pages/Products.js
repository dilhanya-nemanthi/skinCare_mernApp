import React, { useState, useEffect } from 'react';

// Product Catalog Dataset with detailed skin-science specs
const PRODUCTS_DATA = [
  {
    id: 'prod_1',
    name: 'Ceramide Hydrating Barrier Cream',
    brand: 'GlowIQ Science',
    category: 'moisturizer',
    price: 24.50,
    rating: 4.9,
    stock: 15,
    description: 'A rich, lipid-replenishing moisturizer containing 3 essential ceramides, cholesterol, and hyaluronic acid to restore and strengthen a compromised skin barrier.',
    ingredients: ['Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Cholesterol', 'Hyaluronic Acid', 'Glycerin', 'Phytosphingosine'],
    skinType: ['dry', 'combination', 'sensitive'],
    usage: 'Apply a dime-sized amount to clean face and neck in the morning and evening. Pat gently until fully absorbed.',
    volume: '50ml'
  },
  {
    id: 'prod_2',
    name: 'Gentle Amino Acid Foaming Cleanser',
    brand: 'GlowIQ Gentle',
    category: 'cleanser',
    price: 18.00,
    rating: 4.8,
    stock: 22,
    description: 'A pH-balanced, non-stripping cleanser formulated with clean amino acid surfactants and soothing colloidal oatmeal to wash away impurities without disrupting the lipid barrier.',
    ingredients: ['Sodium Cocoyl Glycinate', 'Colloidal Oatmeal', 'Centella Asiatica Extract', 'Panthenol', 'Allantoin'],
    skinType: ['sensitive', 'dry', 'oily', 'combination'],
    usage: 'Massage 1-2 pumps onto damp skin in circular motions. Rinse thoroughly with lukewarm water. Use AM and PM.',
    volume: '150ml'
  },
  {
    id: 'prod_3',
    name: '10% Niacinamide Clarifying Serum',
    brand: 'GlowIQ Correct',
    category: 'serum',
    price: 26.99,
    rating: 4.7,
    stock: 12,
    description: 'High-strength vitamin B3 serum combined with 1% Zinc PCA to regulate excess sebum production, minimize the appearance of enlarged pores, and target blemishes.',
    ingredients: ['Niacinamide (Vitamin B3)', 'Zinc PCA', 'Hyaluronic Acid', 'Tamarind Seed Extract', 'Ethoxydiglycol'],
    skinType: ['oily', 'combination'],
    usage: 'Apply 2-3 drops to the entire face in the morning and evening before heavier creams. Avoid direct eye contact.',
    volume: '30ml'
  },
  {
    id: 'prod_4',
    name: 'Broad Spectrum SPF 50 Mineral Sunscreen',
    brand: 'GlowIQ Protect',
    category: 'sunscreen',
    price: 22.00,
    rating: 4.9,
    stock: 30,
    description: 'A lightweight, non-greasy physical sunscreen formulated with 20% Zinc Oxide, green tea extract, and vitamin E. Delivers broad-spectrum protection with a transparent, satin finish.',
    ingredients: ['Zinc Oxide (20%)', 'Green Tea Leaf Extract', 'Tocopheryl Acetate (Vitamin E)', 'Bisabolol', 'Aloe Vera Leaf Juice'],
    skinType: ['sensitive', 'dry', 'oily', 'combination'],
    usage: 'Shake well. Apply generously to face and neck 15 minutes before sun exposure. Reapply every 2 hours or after swimming.',
    volume: '50ml'
  },
  {
    id: 'prod_5',
    name: 'Salicylic Acid Pore-Refining Liquid (2% BHA)',
    brand: 'GlowIQ Exfoliate',
    category: 'toner',
    price: 19.50,
    rating: 4.6,
    stock: 8,
    description: 'A gentle leave-on exfoliant containing 2% Salicylic Acid (BHA). Penetrates deep into pores to dissolve blackheads, clear sebum, and refine skin texture.',
    ingredients: ['Salicylic Acid (BHA)', 'Green Tea Extract', 'Methylpropanediol', 'Polysorbate 20', 'Butylene Glycol'],
    skinType: ['oily', 'combination'],
    usage: 'Gently apply with fingers or a cotton pad over entire face after cleansing. Start using 2-3 times a week, building to daily use.',
    volume: '118ml'
  },
  {
    id: 'prod_6',
    name: 'Honey & Oatmeal Soothing Relief Mask',
    brand: 'GlowIQ Nature',
    category: 'mask',
    price: 21.00,
    rating: 4.8,
    stock: 14,
    description: 'A deeply comforting wash-off mask infused with real raw manuka honey, colloidal oats, and allantoin. Instantly calms redness, replenishes moisture, and plumps dry skin.',
    ingredients: ['Manuka Honey Extract', 'Colloidal Oatmeal', 'Allantoin', 'Sweet Almond Oil', 'Shea Butter', 'Calendula Extract'],
    skinType: ['dry', 'sensitive'],
    usage: 'Apply a generous, even layer to clean skin. Leave on for 15-20 minutes, then rinse gently with warm water while massaging.',
    volume: '75ml'
  },
  {
    id: 'prod_7',
    name: 'Hyaluronic Acid Plumping Serum (2% HA)',
    brand: 'GlowIQ Hydrate',
    category: 'serum',
    price: 23.50,
    rating: 4.9,
    stock: 18,
    description: 'Multi-molecular weight hyaluronic acid serum designed to penetrate different layers of the skin for deep hydration, smoothing fine lines and delivering a dewy glow.',
    ingredients: ['Sodium Hyaluronate', 'Hydrolyzed Hyaluronic Acid', 'Panthenol (Vitamin B5)', 'Glycerin', 'Phenoxyethanol'],
    skinType: ['dry', 'combination', 'oily', 'sensitive'],
    usage: 'Apply a few drops to damp skin immediately after cleansing or toning. Follow with your favorite moisturizer.',
    volume: '30ml'
  },
  {
    id: 'prod_8',
    name: 'Rose Water pH Balancing Mist',
    brand: 'GlowIQ Nature',
    category: 'toner',
    price: 16.00,
    rating: 4.7,
    stock: 25,
    description: 'A refreshing facial toner mist distilled from organic Damask rose petals, blended with hydrating glycerin and soothing cucumber extract to refresh and prep skin.',
    ingredients: ['Rosa Damascena Flower Water', 'Glycerin', 'Cucumber Fruit Extract', 'Aloe Vera Juice', 'Sodium PCA'],
    skinType: ['sensitive', 'dry', 'combination'],
    usage: 'Mist onto clean face and neck before serums or throughout the day for an instant boost of hydration and cooling relief.',
    volume: '100ml'
  }
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Shopping Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('glowiq_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('glowiq_cart', JSON.stringify(cart));
  }, [cart]);

  // Load Products (Simulates API call first, falls back to static dataset)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        // If backend API returns an array, use it; otherwise fallback to structured mock data
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(PRODUCTS_DATA);
        }
      } catch (error) {
        console.warn('Backend API failed, loading premium catalog data instead.', error);
        setProducts(PRODUCTS_DATA);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Category labels
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'cleanser', label: 'Cleansers' },
    { id: 'toner', label: 'Toners' },
    { id: 'serum', label: 'Serums' },
    { id: 'moisturizer', label: 'Moisturizers' },
    { id: 'sunscreen', label: 'Sunscreens' },
    { id: 'mask', label: 'Masks' }
  ];

  // Filtering & Searching Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.ingredients && product.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default popularity / ID order
  });

  // Cart Functions
  const addToCart = (product, e) => {
    if (e) e.stopPropagation(); // Prevent card modal click
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
    // Visual trigger to slide open cart drawer
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId && item.product._id !== productId));
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

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setCart([]);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 3500);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (loading) return <div className="products-loading">Loading skincare catalog...</div>;

  return (
    <div className="products-container">
      {/* Products Hero */}
      <div className="products-hero-section">
        <h2>Clinical Skincare Solutions</h2>
        <p>Explore clean, scientifically proven skincare formulations designed to hydrate, balance, and clarify your complexion. Targeted results for every skin concern.</p>
        
        {/* Floating Cart Button */}
        <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalCartCount > 0 && <span className="cart-badge">{totalCartCount}</span>}
        </button>
      </div>

      {/* Catalog Controls */}
      <div className="catalog-controls">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by ingredient, brand, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>&times;</button>
          )}
        </div>

        <div className="controls-row-bottom">
          <div className="filter-chips">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="sort-box">
            <label htmlFor="sort-select">Sort By</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Display Grid */}
      <div className="products-grid-custom">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => {
            const id = product.id || product._id;
            return (
              <div 
                key={id} 
                className="product-card-custom" 
                onClick={() => setSelectedProduct(product)}
              >
                <div className="card-image-placeholder">
                  <span className="card-cat-badge">{product.category.toUpperCase()}</span>
                  <div className="product-icon-art">
                    {product.category === 'cleanser' && '🧼'}
                    {product.category === 'serum' && '🧪'}
                    {product.category === 'moisturizer' && '🧴'}
                    {product.category === 'sunscreen' && '☀️'}
                    {product.category === 'toner' && '💦'}
                    {product.category === 'mask' && '🎭'}
                  </div>
                </div>

                <div className="card-info">
                  <span className="card-brand">{product.brand}</span>
                  <h3>{product.name}</h3>
                  
                  {/* Rating Stars */}
                  <div className="card-rating">
                    <div className="stars-fill">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`star-icon ${i < Math.floor(product.rating) ? 'active' : ''}`} 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span>{product.rating}</span>
                  </div>

                  <p className="card-desc">{product.description.substring(0, 85)}...</p>
                  
                  <div className="card-footer-price">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button 
                      className="add-to-cart-btn"
                      onClick={(e) => addToCart(product, e)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-products">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <h3>No products found</h3>
            <p>Try matching another category or refining your search term.</p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Your Shopping Cart</h3>
              <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
            </div>

            {checkoutSuccess ? (
              <div className="checkout-success-view">
                <div className="checkout-success-check animate-fade-in">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h4>Checkout Successful!</h4>
                <p>Your orders have been processed. Get ready to glow!</p>
              </div>
            ) : (
              <>
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
                  <button 
                    className="checkout-btn" 
                    disabled={cart.length === 0}
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>&times;</button>
            
            <div className="modal-content-grid">
              <div className="modal-left-art">
                <div className="modal-art-badge">{selectedProduct.category.toUpperCase()}</div>
                <div className="modal-art-icon">
                  {selectedProduct.category === 'cleanser' && '🧼'}
                  {selectedProduct.category === 'serum' && '🧪'}
                  {selectedProduct.category === 'moisturizer' && '🧴'}
                  {selectedProduct.category === 'sunscreen' && '☀️'}
                  {selectedProduct.category === 'toner' && '💦'}
                  {selectedProduct.category === 'mask' && '🎭'}
                </div>
                <h3>{selectedProduct.volume || '50ml'}</h3>
              </div>

              <div className="modal-right-details">
                <span className="modal-brand">{selectedProduct.brand}</span>
                <h2>{selectedProduct.name}</h2>
                <div className="modal-price">${selectedProduct.price.toFixed(2)}</div>
                
                <p className="modal-desc">{selectedProduct.description}</p>
                
                <div className="modal-section-info">
                  <h4>Suitable Skin Types</h4>
                  <div className="skin-tags">
                    {selectedProduct.skinType && selectedProduct.skinType.map((type, idx) => (
                      <span key={idx} className="skin-tag">{type.toUpperCase()}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-section-info">
                  <h4>How to Use</h4>
                  <p>{selectedProduct.usage || 'Apply to face and neck as needed.'}</p>
                </div>

                {selectedProduct.ingredients && (
                  <div className="modal-section-info">
                    <h4>Key Ingredients</h4>
                    <p className="modal-ingredients">{selectedProduct.ingredients.join(', ')}</p>
                  </div>
                )}

                <button 
                  className="modal-add-btn" 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Shopping Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
