// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXhjg-IBbtbxE4ybzxDDCimoUHiX4x23o",
    authDomain: "qwiklabs-gcp-02-c4f92341f9e1.firebaseapp.com",
    projectId: "qwiklabs-gcp-02-c4f92341f9e1",
    appId: "1:58220403402:web:8674af7b5c54f58f883233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
export const functions =getFunctions();
export function signInWithGoogle(){
    return signInWithPopup(auth, new GoogleAuthProvider());
}
export function signOut(){
    return auth.signOut();
}
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }