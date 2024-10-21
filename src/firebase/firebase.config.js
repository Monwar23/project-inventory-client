// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZc2KTPnQzSm7wwdpNajmMNKD5Us1RlIc",
    authDomain: "inventory-4f105.firebaseapp.com",
    projectId: "inventory-4f105",
    storageBucket: "inventory-4f105.appspot.com",
    messagingSenderId: "483521372208",
    appId: "1:483521372208:web:6b7bc953465c81529d8df5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;