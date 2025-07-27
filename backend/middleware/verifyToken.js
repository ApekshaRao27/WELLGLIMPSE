require('dotenv').config(); // Load env variables at the very top
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  // Try to get token from Authorization header first
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.token;
  const token = cookieToken || (authHeader && authHeader.split(' ')[1]);

  console.log("🔐 Incoming token:", token);

  if (!token) {
    console.warn("❌ No token found in headers or cookies");
    return res.status(401).json({ message: 'No token provided, unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("✅ Token verified. User info:", decoded);
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
