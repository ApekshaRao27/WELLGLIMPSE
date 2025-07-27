
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFQBna53rTZ_gecXG3LPJgBM-4tpjJqrM",
  authDomain: "diabetesprediction-5726d.firebaseapp.com",
  projectId: "diabetesprediction-5726d",
  storageBucket: "diabetesprediction-5726d.appspot.com", // ⚠️ You had `.firebasestorage.app`, correct this
  messagingSenderId: "913605355770",
  appId: "1:913605355770:web:eca2c1b7c65b1224468143"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

const provider= new GoogleAuthProvider();
export { auth, provider };