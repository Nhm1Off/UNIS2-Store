import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkbg5rtAZ9SV321Djga4xBwsTG2uOUpjw",
    authDomain: "maldenahealth-finally.firebaseapp.com",
    projectId: "maldenahealth-finally",
    storageBucket: "maldenahealth-finally.firebasestorage.app",
    messagingSenderId: "494931005513",
    appId: "1:494931005513:web:72dd11f631433967c9ef98",
    measurementId: "G-YH5DSD3L77"
};

const logoutBtn = document.getElementById("logout");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Sign-in function
const userSignin = (e) => {
    e.preventDefault();
    const email = signinEmailInput.value;
    const password = signinPasswordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Store the user ID in localStorage after successful sign-in
            localStorage.setItem('loggedInUserId', user.uid);
            alert("Signed in successfully!");
            window.location.replace("https://unis2.store/maldenaHealth/profile");
        })
        .catch((error) => {
            alert(error);
        });
}

// Sign-out function
const logoutUser = () => {
    signOut(auth).then(() => {
        alert("Signed out!");
        window.location.replace("https://unis2.store/maldenaHealth/login");
    }).catch((error) => {
        alert(error);
    });
}

// Attach event listeners
logoutBtn.addEventListener("click", logoutUser);

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        document.getElementById('loggedUserEmail').innerText = userData.email;
                        document.getElementById('loggedUserName').innerText = userData.lastName;
                    } else {
                        console.log("No document found for this user.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        } else {
            console.log("User ID not found in local storage.");
        }
    } else {
        console.log("User is not authenticated.");
    }
});
