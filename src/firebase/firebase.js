// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCklRfS1dK-ZqtnrciBWba0UrH8q_HlxbM",
    authDomain: "just-circle-347806.firebaseapp.com",
    projectId: "just-circle-347806",
    storageBucket: "just-circle-347806.appspot.com",
    messagingSenderId: "438929223093",
    appId: "1:438929223093:web:653dbec5fa95b39833fdfc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage()

export {db , storage};
