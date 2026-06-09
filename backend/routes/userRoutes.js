const express = require('express');
const router = express.Router();
// const { getUser, updateUser, deleteUser } = require('../controllers/userController');

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', (req, res) => {
  res.json({ message: 'Get user by ID' });
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', (req, res) => {
  res.json({ message: 'Update user' });
});

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete user' });
});

module.exports = router;
