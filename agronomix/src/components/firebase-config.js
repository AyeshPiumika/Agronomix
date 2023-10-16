import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdgtV7aI7Az1Hg2tISjr93netsFpxMlX4",
  authDomain: "agronomix-e0867.firebaseapp.com",
  projectId: "agronomix-e0867",
  storageBucket: "agronomix-e0867.appspot.com",
  messagingSenderId: "804101499461",
  appId: "1:804101499461:web:f5d09772150d16b0fbd12c",
  measurementId: "G-R4VSM04X51",
};

const app = initializeApp(firebaseConfig);
// const firebaseApp = initializeApp(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
