// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // ✅ استيراد Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqs-NtW6-C5ARRbDgEt6Zh6Hd2CKp4_Mc",
  authDomain: "aklak-men-misr-admin.firebaseapp.com",
  projectId: "aklak-men-misr-admin",
  storageBucket: "aklak-men-misr-admin.firebasestorage.app",
  messagingSenderId: "969812864428",
  appId: "1:969812864428:web:539d5ad89c633718fa9e09",
  measurementId: "G-VZ2GDYV3W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // يمكنك استخدامها مستقبلاً للتتبع
const auth = getAuth(app); // ✅ تم التصدير الصحيح
const db = getFirestore(app); // ✅ تم التصدير الصحيح

// Export both auth and db
export { app, auth, db };