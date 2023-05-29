// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwjKzoR8TLlpgfpm1TmkL-vtEWRENNKyo",
  authDomain: "racesg-lifehack2023.firebaseapp.com",
  projectId: "racesg-lifehack2023",
  storageBucket: "racesg-lifehack2023.appspot.com",
  messagingSenderId: "437669094647",
  appId: "1:437669094647:web:b6c7d4b9477063fa431ff2",
  measurementId: "G-Z7P1P27CDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };
