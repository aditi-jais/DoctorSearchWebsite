import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC_PEmfbqp13vKjxGtJdEJEYqlS1h3Bq_4",
  authDomain: "doctorwebsite-e6c2c.firebaseapp.com",
  projectId: "doctorwebsite-e6c2c",
  storageBucket: "doctorwebsite-e6c2c.appspot.com",
  messagingSenderId: "122972750523",
  appId: "1:122972750523:web:7dd914eb4c68012a0b5f9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
