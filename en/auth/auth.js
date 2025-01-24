import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Cookie utilities
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Lax`;
}

const signUp = document.getElementById("registerBtn");

signUp.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userData = { email, name };

        await setDoc(doc(db, "users", user.uid), userData); // Додаємо користувача до Firestore

        // Вхід після реєстрації
        const signInCredential = await signInWithEmailAndPassword(auth, email, password);
        const signInUser = signInCredential.user;

        // Запам'ятовуємо користувача
        setCookie("loggedInUserId", signInUser.uid, 120);

        setTimeout(() => {
            window.location.href = "/en/welcome/tester"; // Перенаправляємо на профіль
        }, 500);

    } catch (error) {
        console.error("Sign-up error: ", error);
    }
});
