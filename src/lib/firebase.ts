import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from  "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDMQT6e4KTqva0D7rIWnSaBKICmG4QYWyY",
//   authDomain: "qard-hassan.firebaseapp.com",
//   projectId: "qard-hassan",
//   storageBucket: "qard-hassan.firebasestorage.app",
//   messagingSenderId: "1029950983841",
//   appId: "1:1029950983841:web:064d016f5430e3b7142ae0",
//   measurementId: "G-Z8KZSB3WDX"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBYffsJEzYb_fi7Vp2y7c9MbmEK-LWBNpc",
  authDomain: "waqf-tyba.firebaseapp.com",
  projectId: "waqf-tyba",
  storageBucket: "waqf-tyba.firebasestorage.app",
  messagingSenderId: "98712754394",
  appId: "1:98712754394:web:9e849cd21fc9cb57a32de3"
};
// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };