import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVNhKPPpwSlamS2VN2lO6NA6Lib9eHOOI",
  authDomain: "maidjobs4u-6c95c.firebaseapp.com",
  projectId: "maidjobs4u-6c95c",
  storageBucket: "maidjobs4u-6c95c.appspot.com",
  messagingSenderId: "699773958552",
  appId: "1:699773958552:web:dd6f6e9b67aed0ed5893ed",
  measurementId: "G-F57MLY9MYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with offline persistence
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  console.error('Firebase persistence error:', err);
});

export { db, app };