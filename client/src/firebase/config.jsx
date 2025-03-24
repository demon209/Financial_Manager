// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkCLwVmQgL-tfkinFtg1582d1PXK9siIg",
  authDomain: "financial-manager-qvu15.firebaseapp.com",
  projectId: "financial-manager-qvu15",
  storageBucket: "financial-manager-qvu15.firebasestorage.app",
  messagingSenderId: "985242723314",
  appId: "1:985242723314:web:6cb1f6a33e5623e874416b",
  measurementId: "G-YVZYFELVEH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
