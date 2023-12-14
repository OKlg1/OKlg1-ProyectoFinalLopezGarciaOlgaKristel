import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB0Ngk4sYyEaJo6xkxg6Xmym-ffdnBAdug",
  authDomain: "coder-fb.firebaseapp.com",
  projectId: "coder-fb",
  storageBucket: "coder-fb.appspot.com",
  messagingSenderId: "926102748362",
  appId: "1:926102748362:web:abb09f01b297722c524833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportamos nuestra base de datos a toda la app
export const db = getFirestore(app);