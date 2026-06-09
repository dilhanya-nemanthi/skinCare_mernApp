import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Payment({ cart, removeFromCart, updateQuantity, clearCart }) {
  const navigate = useNavigate();
  
  // Shipping Form State
  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // Card Form State
  const [card, setCard] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Form errors
  const [errors, setErrors] = useState({});
  
  // Payment Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Card type detection
  const getCardType = (number) => {
    const trimmed = number.replace(/\s+/g, '');
    if (trimmed.startsWith('4')) return 'visa';
    if (trimmed.startsWith('5')) return 'mastercard';
    if (trimmed.startsWith('3')) return 'amex';
    if (trimmed.startsWith('6')) return 'discover';
    return 'unknown';
  };

  // Card formatting
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Digits only
    if (value.length > 16) value = value.slice(0, 16);
    
    // Group into 4s
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.slice(i, i + 4));
    }
    
    setCard(prev => ({
      ...prev,
      cardNumber: parts.join(' ')
    }));
    
    if (errors.cardNumber) {
      setErrors(prev => ({ ...prev, cardNumber: '' }));
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Digits only
    if (value.length > 4) value = value.slice(0, 4);
    
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    
    setCard(prev => ({
      ...prev,
      expiryDate: formatted
    }));
    
    if (errors.expiryDate) {
      setErrors(prev => ({ ...prev, expiryDate: '' }));
    }
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Digits only
    const cardType = getCardType(card.cardNumber);
    const maxLength = cardType === 'amex' ? 4 : 3;
    if (value.length > maxLength) value = value.slice(0, maxLength);
    
    setCard(prev => ({
      ...prev,
      cvv: value
    }));
    
    if (errors.cvv) {
      setErrors(prev => ({ ...prev, cvv: '' }));
    }
  };

  // Generic Handlers
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardholderChange = (e) => {
    setCard(prev => ({ ...prev, cardholderName: e.target.value }));
    if (errors.cardholderName) {
      setErrors(prev => ({ ...prev, cardholderName: '' }));
    }
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingCost = subtotal > 50 ? 0 : (cart.length > 0 ? 5.99 : 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + tax;

  // Validation
  const validateForm = () => {
    const tempErrors = {};
    
    if (!shipping.fullName.trim()) tempErrors.fullName = 'Full name is required';
    if (!shipping.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shipping.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!shipping.address.trim()) tempErrors.address = 'Shipping address is required';
    if (!shipping.city.trim()) tempErrors.city = 'City is required';
    if (!shipping.zipCode.trim()) tempErrors.zipCode = 'ZIP code is required';
    
    if (!card.cardholderName.trim()) tempErrors.cardholderName = 'Cardholder name is required';
    
    const cardDigits = card.cardNumber.replace(/\s+/g, '');
    if (cardDigits.length < 15) {
      tempErrors.cardNumber = 'Card number must be 15-16 digits';
    }
    
    if (card.expiryDate.length < 5) {
      tempErrors.expiryDate = 'Required (MM/YY)';
    } else {
      const [month, year] = card.expiryDate.split('/').map(v => parseInt(v, 10));
      const currentYear = new Date().getFullYear() % 100; // e.g. 26
      const currentMonth = new Date().getMonth() + 1; // 1-12
      if (!month || month < 1 || month > 12) {
        tempErrors.expiryDate = 'Invalid Month';
      } else if (!year || year < currentYear || (year === currentYear && month < currentMonth)) {
        tempErrors.expiryDate = 'Card Expired';
      }
    }
    
    const cardType = getCardType(card.cardNumber);
    const expectedCvvLength = cardType === 'amex' ? 4 : 3;
    if (card.cvv.length < expectedCvvLength) {
      tempErrors.cvv = `CVV must be ${expectedCvvLength} digits`;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Order Submission Flow
  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Step 1
    setProcessingStep('Authorizing Card...');
    
    // Step 2
    setTimeout(() => {
      setProcessingStep('Securing Connection...');
    }, 800);

    // Step 3
    setTimeout(() => {
      setProcessingStep('Confirming Order...');
    }, 1600);

    // Success
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const randomId = 'GIQ-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderId(randomId);
      clearCart();
    }, 2400);
  };

  // Card Carrier SVG Logos
  const renderCardIcon = () => {
    const cardType = getCardType(card.cardNumber);
    switch (cardType) {
      case 'visa':
        return (
          <svg className="card-issuer-svg visa-logo" viewBox="0 0 48 48">
            <path fill="#1565C0" d="M18.8 28.5L20.8 16h3.2l-2 12.5zM29.8 16.3c-.6-.3-1.6-.6-2.7-.6-3 0-5.1 1.6-5.1 3.9 0 1.7 1.5 2.6 2.7 3.2 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.1-1.9 1.1-1.3 0-2-.2-3.1-.7l-.4-.2-.5 3c.8.4 2.3.7 3.8.7 3.2 0 5.3-1.6 5.3-4 0-1.3-.8-2.3-2.6-3.2-1.1-.6-1.8-.9-1.8-1.5 0-.6.6-1.1 1.9-1.1 1.1 0 1.9.2 2.5.5l.3.2.4-2.8zM36.4 16h-2.5c-.8 0-1.4.5-1.7 1.2l-4.8 11.3h3.4l.7-1.9h4.1l.4 1.9h3zM33.1 24l1.4-3.8.8 3.8h-2.2zM12.9 16l-3.3 8.7-.3-1.7c-.6-2-2.3-4.1-4.3-5.2l2.8 10.7h3.4L16.2 16h-3.3z" />
          </svg>
        );
      case 'mastercard':
        return (
          <svg className="card-issuer-svg mc-logo" viewBox="0 0 48 48">
            <circle cx="18" cy="24" r="14" fill="#FF5F00" fillOpacity="0.8" />
            <circle cx="30" cy="24" r="14" fill="#EB001B" fillOpacity="0.8" />
          </svg>
        );
      case 'amex':
        return (
          <svg className="card-issuer-svg amex-logo" viewBox="0 0 48 48">
            <rect width="40" height="28" x="4" y="10" rx="3" fill="#0070CD" />
            <text x="9" y="29" fill="#FFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
          </svg>
        );
      case 'discover':
        return (
          <svg className="card-issuer-svg discover-logo" viewBox="0 0 48 48">
            <path fill="#F47216" d="M24 8C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8zm0 28c-6.63 0-12-5.37-12-12S17.37 12 24 12s12 5.37 12 12-5.37 12-12 12z" />
            <circle cx="24" cy="24" r="7" fill="#FFF" />
          </svg>
        );
      default:
        return (
          <svg className="card-issuer-svg lock-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        );
    }
  };

  // Success view
  if (paymentSuccess) {
    return (
      <div className="payment-success-screen animate-fade-in">
        <div className="success-card">
          <div className="success-icon-container">
            <svg className="checkmark" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2>Payment Successful!</h2>
          <p className="order-id">Order ID: <strong>{generatedOrderId}</strong></p>
          <p className="success-message">
            Thank you for shopping with <strong>GlowIQ</strong>. Your transaction has been completed, and an order confirmation email has been dispatched. Ready for your skin-science journey?
          </p>
          <button className="back-btn" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Processing screen overlay
  if (isProcessing) {
    return (
      <div className="payment-loading-screen">
        <div className="spinner-container">
          <div className="glow-spinner"></div>
          <div className="pulse-circle"></div>
          <h3>{processingStep}</h3>
          <p>Please do not refresh the page or close your browser.</p>
        </div>
      </div>
    );
  }

  // Empty cart view
  if (cart.length === 0) {
    return (
      <div className="payment-empty-screen">
        <div className="empty-payment-card">
          <svg className="empty-cart-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your cart is empty</h2>
          <p>You cannot checkout with an empty cart. Add premium GlowIQ formulations to begin your routine!</p>
          <Link to="/products" className="browse-products-btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page-container">
      {/* Back button */}
      <div className="payment-page-header">
        <button onClick={() => navigate('/products')} className="payment-back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Catalog
        </button>
        <h2>Secure Checkout</h2>
      </div>

      <div className="payment-layout-grid">
        {/* Left Column: Form */}
        <div className="payment-form-column">
          <form onSubmit={handleSubmitPayment}>
            {/* Shipping Info Block */}
            <div className="form-section-card">
              <h3>1. Shipping Destination</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Jane Doe"
                  value={shipping.fullName}
                  onChange={handleShippingChange}
                  className={errors.fullName ? 'error-input' : ''}
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jane.doe@example.com"
                  value={shipping.email}
                  onChange={handleShippingChange}
                  className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="123 Glow Avenue"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  className={errors.address ? 'error-input' : ''}
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group col-half">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Skin City"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    className={errors.city ? 'error-input' : ''}
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>

                <div className="form-group col-half">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    placeholder="90210"
                    value={shipping.zipCode}
                    onChange={handleShippingChange}
                    className={errors.zipCode ? 'error-input' : ''}
                  />
                  {errors.zipCode && <span className="field-error">{errors.zipCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Details Block */}
            <div className="form-section-card">
              <h3>2. Card Payment Details</h3>
              
              <div className="form-group">
                <label htmlFor="cardholderName">Name on Card</label>
                <input
                  type="text"
                  id="cardholderName"
                  placeholder="JANE DOE"
                  value={card.cardholderName}
                  onChange={handleCardholderChange}
                  className={errors.cardholderName ? 'error-input' : ''}
                />
                {errors.cardholderName && <span className="field-error">{errors.cardholderName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <div className="card-input-wrapper">
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="4000 1234 5678 9010"
                    value={card.cardNumber}
                    onChange={handleCardNumberChange}
                    className={errors.cardNumber ? 'error-input' : ''}
                  />
                  <div className="input-logo-container">
                    {renderCardIcon()}
                  </div>
                </div>
                {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group col-half">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={card.expiryDate}
                    onChange={handleExpiryChange}
                    className={errors.expiryDate ? 'error-input' : ''}
                  />
                  {errors.expiryDate && <span className="field-error">{errors.expiryDate}</span>}
                </div>

                <div className="form-group col-half">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="password"
                    id="cvv"
                    placeholder="•••"
                    value={card.cvv}
                    onChange={handleCvvChange}
                    className={errors.cvv ? 'error-input' : ''}
                  />
                  {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                </div>
              </div>
            </div>

            <button type="submit" className="payment-submit-btn">
              Pay ${grandTotal.toFixed(2)} Securely
            </button>
          </form>
        </div>

        {/* Right Column: Invoice summary */}
        <div className="payment-summary-column">
          <div className="invoice-summary-card">
            <h3>Invoice Summary</h3>
            
            <div className="invoice-items-list">
              {cart.map((item) => {
                const id = item.product.id || item.product._id;
                return (
                  <div key={id} className="invoice-item-row">
                    <div className="item-row-left">
                      <div className="invoice-item-avatar">
                        {item.product.category === 'cleanser' && '🧼'}
                        {item.product.category === 'serum' && '🧪'}
                        {item.product.category === 'moisturizer' && '🧴'}
                        {item.product.category === 'sunscreen' && '☀️'}
                        {item.product.category === 'toner' && '💦'}
                        {item.product.category === 'mask' && '🎭'}
                      </div>
                      <div className="invoice-item-details">
                        <h4>{item.product.name}</h4>
                        <span className="invoice-item-brand">{item.product.brand}</span>
                        
                        <div className="invoice-qty-controls">
                          <button onClick={() => updateQuantity(id, -1)}>&minus;</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="item-row-right">
                      <button className="invoice-delete-item" onClick={() => removeFromCart(id)}>&times;</button>
                      <span className="invoice-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="invoice-financial-details">
              <div className="financial-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="financial-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="financial-row">
                <span>Estimated Sales Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="financial-total">
                <span>Total Amount Due</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-security-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>SSL Secured & 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
