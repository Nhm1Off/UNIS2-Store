import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkbg5rtAZ9SV321Djga4xBwsTG2uOUpjw",
    authDomain: "maldenahealth-finally.firebaseapp.com",
    projectId: "maldenahealth-finally",
    storageBucket: "maldenahealth-finally.firebasestorage.app",
    messagingSenderId: "494931005513",
    appId: "1:494931005513:web:72dd11f631433967c9ef98",
    measurementId: "G-YH5DSD3L77"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById("loggedUserName").innerText = userData.name;
                document.getElementById("loggedUserEmail").innerText = userData.email;
            }
            else {
                console.log("No document found with matching id");
            }
        })
        .catch((error) => {
            console.log("Error getting document");
        })
    }
    else {
        console.log("User Id not found in Local Storage")
    }
})

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUserId");
    signOut(auth) 
    .then(() => {
        window.location.href = "../auth/register";
    })
    .catch((error) => {
        console.error("Error Signing out: ", error);
    })
})
