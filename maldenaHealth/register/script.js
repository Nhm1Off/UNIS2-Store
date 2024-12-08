const nameInput = document.querySelector("#name");
const regEmail = document.querySelector("#email");
const Registerpassword = document.querySelector("#password");
const regBtn = document.querySelector("#registerBtn");

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; 

// Your web app's Firebase configuration
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

// Input validation function
const validateInputs = () => {
    if (!nameInput.value || !regEmail.value || !Registerpassword.value) {
        alert("Please fill out all fields.");
        return false;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(regEmail.value)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate password length (example: at least 6 characters)
    if (Registerpassword.value.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    return true;
}

// Registration function
const userReg = async (event) => {
    event.preventDefault();

    // Validate inputs before creating the account
    if (!validateInputs()) {
        return; // Stop further execution if validation fails
    }

    try {
        const email = regEmail.value;
        const password = Registerpassword.value;

        // Create user with email and password
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // If registration is successful, update user profile
                return updateProfile(auth.currentUser, {
                    displayName: nameInput.value
                });
            })
            .catch((error) => {
                // Handle error during user creation
                alert("Error during registration: " + error.message);
            });

        // Successfully registered and updated profile
        alert("Account has been created successfully!");
        window.location.replace("https://unis2.store/maldenaHealth/profile");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Event listener for register button
regBtn.addEventListener("click", userReg);
