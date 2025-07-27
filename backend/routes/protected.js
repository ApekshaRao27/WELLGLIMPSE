const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Example Protected Route
router.get('/protected-route', verifyToken, (req, res) => {
  res.json({
    message: 'You accessed a protected route!',
    user: req.user  // You get user info from token
  });
});

module.exports = router;
