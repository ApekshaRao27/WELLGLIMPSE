import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDFQBna53rTZ_gecXG3LPJgBM-4tpjJqrM",
  authDomain: "diabetesprediction-5726d.firebaseapp.com",
  projectId: "diabetesprediction-5726d",
  storageBucket: "diabetesprediction-5726d.appspot.com", // ⚠️ You had `.firebasestorage.app`, correct this
  messagingSenderId: "913605355770",
  appId: "1:913605355770:web:eca2c1b7c65b1224468143"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
