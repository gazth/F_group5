// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA_sDsRGAsSqMb5VPrvzswXO5pZIuphY-s",
  authDomain: "gather-fef2c.firebaseapp.com",
  databaseURL:
    "https://gather-fef2c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gather-fef2c",
  storageBucket: "gather-fef2c.firebasestorage.app",
  messagingSenderId: "31557065220",
  appId: "1:31557065220:web:e005802a438d48f2a23351",
  measurementId: "G-QSQC5N8RW8",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
