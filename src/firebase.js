import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNOLnwYOtHmiXEKjelBJ38Oq1EsvrxekI",
  authDomain: "ats-jobportal.firebaseapp.com",
  projectId: "ats-jobportal",
  storageBucket: "ats-jobportal.appspot.com",
  messagingSenderId: "517891259288",
  appId: "1:517891259288:web:de874c60bc2f56bef389ed",
  measurementId: "G-ZJX0NWNGE4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider("microsoft.com");
const analytics = getAnalytics(app);
