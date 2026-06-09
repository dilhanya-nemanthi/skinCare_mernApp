const express = require('express');
const router = express.Router();
// const { getProducts, getProductById, createProduct } = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Get all products' });
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ message: 'Get product by ID' });
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/', (req, res) => {
  res.json({ message: 'Create product' });
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/:id', (req, res) => {
  res.json({ message: 'Update product' });
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete product' });
});

module.exports = router;
