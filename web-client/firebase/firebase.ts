// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6ksWku7rcHWGU0ghjieMRWnX7HmKN8o8",
  authDomain: "mtube-6cf51.firebaseapp.com",
  projectId: "mtube-6cf51",
  storageBucket: "mtube-6cf51.appspot.com",
  messagingSenderId: "119521814754",
  appId: "1:119521814754:web:dad496372fb3e9ed0516bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
export function signInWithGoogle(){
    return signInWithPopup(auth, new GoogleAuthProvider());
}
export function signOut(){
    return auth.signOut();
}
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }