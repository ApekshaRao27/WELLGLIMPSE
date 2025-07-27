// firebase.js
const admin = require("firebase-admin");

const serviceAccount = require("./config/firebase_admin_key.json"); // 🔑 Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
