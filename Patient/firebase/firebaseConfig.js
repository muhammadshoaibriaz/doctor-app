// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore, collection } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv2Q-Hw4J_VxUXmaCwFiT9RUkF3mhl3D4",
  authDomain: "doctor-2a81c.firebaseapp.com",
  projectId: "doctor-2a81c",
  storageBucket: "doctor-2a81c.appspot.com",
  messagingSenderId: "368948321476",
  appId: "1:368948321476:web:47d47d878a2d35263fbd91",
  measurementId: "G-PZQSSBZ6WS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const getFirestore = getFirestore(app);
const db = getFirestore(app);
export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
export const analytics = getAnalytics(app);
