const nameInput = document.querySelector("#name");
const regEmail = document.querySelector("#email");
const Registerpassword = document.querySelector("#password");
const regBtn = document.querySelector("#registerBtn");



import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; // Імпортуємо методи аутентифікації
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

// Код
const userReg = async (event) => {
    event.preventDefault();

    try {
        const email = regEmail.value;
        const password = Registerpassword.value;

        await createUserWithEmailAndPassword(auth,email,password).catch((error) => {
            alert(error)
        })

        await updateProfile(auth.currentUser, {
            displayName: nameInput.value
        })
        alert("Account has been created")
        window.location.replace("https://unis2.store/maldenaHealth/profile")
    } catch (error) {
        alert(error) 
    }
}

regBtn.addEventListener("click",  userReg)
