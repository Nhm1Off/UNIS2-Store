const signinBtn = document.getElementById("SignInBtn")

const signinEmailInput = document.querySelector("#SignInEmail");
const signinPasswordInput = document.querySelector("#SignInPassword");

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; // Імпортуємо методи аутентифікації
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkbg5rtAZ9SV321Djga4xBwsTG2uOUpjw",
  authDomain: "maldenahealth-finally.firebaseapp.com",
  projectId: "maldenahealth-finally",
  storageBucket: "maldenahealth-finally.firebasestorage.app",
  messagingSenderId: "494931005513",
  appId: "1:494931005513:web:72dd11f631433967c9ef98",
  measurementId: "G-YH5DSD3L77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);


const userSignin = (e) => {
    e.preventDefault();
    const email = signinEmailInput.value;
    const password = signinPasswordInput.value;
    try {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            alert("Signed in succesfully!")
            window.location.replace("http://127.0.0.1:5500")

        }).catch( (error) => {
            alert(error);
        })
    } catch (error) {
        alert(error);
    }
}

signinBtn.addEventListener("click", userSignin);
