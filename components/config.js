import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlyiF83MT5K4X34lJMO6f1gmC2WmdPY3k",
  authDomain: "project1-90cf3.firebaseapp.com",
  projectId: "project1-90cf3",
  storageBucket: "project1-90cf3.appspot.com",
  messagingSenderId: "625838080182",
  appId: "1:625838080182:web:9151733b46a95589e1e617",
  measurementId: "G-4VT55LQ821"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);