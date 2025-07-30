const admin = require("firebase-admin");
require('dotenv').config();

let serviceAccount;

// Check if in production (e.g., Render or Vercel)
if (process.env.NODE_ENV === 'production') {
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON);
} else {
  // Local development
  serviceAccount = require("./config/firebase_admin_key.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

