import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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

function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

const userNameElement = document.getElementById("userName");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid); // Отримуємо документ користувача за його UID
        const userDoc = await getDoc(userRef); // Отримуємо дані документа

        if (userDoc.exists()) {
            const userData = userDoc.data(); // Отримуємо дані користувача
            const userName = userData.name; // Припустимо, що в Firestore є поле "name"

            // Вставляємо ім'я користувача в елемент <span>
            userNameElement.textContent = `${userName}`;
        } else {
            console.log("Документ не існує!");
        }
    } else {
        console.log("Користувач не авторизований.");
    }
});
