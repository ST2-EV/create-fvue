import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "XXXXXXXXXXX",
  authDomain: "XXXXXXXXXXX",
  projectId: "XXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXX",
  messagingSenderId: "XXXXXXXX",
  appId: "XXXXXXXXXXX"
};

const frapp = initializeApp(firebaseConfig);
const auth = getAuth(frapp);
const db = getFirestore(frapp)

export {db, auth};