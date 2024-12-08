const signinBtn = document.getElementById("SignInBtn")

const signinEmailInput = document.querySelector("#SignInEmail");
const signinPasswordInput = document.querySelector("#SignInPassword");

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; // Імпортуємо методи аутентифікації
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
            window.location.replace("https://unis2.store/maldenaHealth/profile")

        }).catch((error) => {
            alert(error);
        })
    } catch (error) {
        alert(error);
    }
}

const logoutUser = () => {
    try {
        signOut(auth).then(() => {
            alert("Signed out!");
            window.location.replace("https://unis2.store/maldenaHealth/login");
        })
    } catch (error) {
        alert(error);
    }
}


signinBtn.addEventListener("click", userSignin);

const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            window.location.href = "https://unis2.store/maldenaHealth/profile";

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

})

function updateUserProfile(user) {
    if (user) {
        const userName = user.displayName || "No name available";
        const userEmail = user.email || "No email available";
        const userProfilePicture = user.photoURL || "default-profile-picture-url.jpg";

        // Переконатись, що елементи DOM існують перед їх використанням
        const userNameElement = document.getElementById("userName");
        const userEmailElement = document.getElementById("userEmail");
        const userProfilePictureElement = document.getElementById("userProfilePicture");

        if (userNameElement) userNameElement.textContent = userName;
        if (userEmailElement) userEmailElement.textContent = userEmail;
        if (userProfilePictureElement) userProfilePictureElement.src = userProfilePicture;
    } else {
        console.error("User object is undefined or null.");
    }
}

updateUserProfile()

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Якщо користувач авторизований, оновіть профіль
        updateUserProfile(user);
    } else {
        // Якщо користувач не авторизований
        alert("Create account & Login");
    }
});
