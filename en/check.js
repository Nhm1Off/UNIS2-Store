import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDxCTqPRnmw4bitGyR9nKdRQ0AO8e3MlZE",
    authDomain: "unis2-site.firebaseapp.com",
    projectId: "unis2-site",
    storageBucket: "unis2-site.firebasestorage.app",
    messagingSenderId: "248559645177",
    appId: "1:248559645177:web:1896de80583b98c2130d28",
    measurementId: "G-9ZRE552PM0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const user = auth.currentUser;

const accountA = document.getElementById("accountA_en");

onAuthStateChanged((auth), user => {
    if (user) {
        accountA.textContent = "Go to profile";
        accountA.href = "/en/welcome/tester"
    } else {
        return;
    }
})
