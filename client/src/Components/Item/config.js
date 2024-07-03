// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from 'firebase/storage'; // If you're using storage

const firebaseConfig = {
  apiKey: "AIzaSyARTYSL3R5JioQUARJK-o5z978kXgShLmg",
  authDomain: "rentit-e521b.firebaseapp.com",
  projectId: "rentit-e521b",
  storageBucket: "rentit-e521b.appspot.com",
  messagingSenderId: "700787784826",
  appId: "1:700787784826:web:027ec6ca559be955c58fc3",
  measurementId: "G-EQ37N52D7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDB = getStorage(app)