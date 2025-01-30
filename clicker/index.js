import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// 🔥 Firebase конфігурація
const firebaseConfig = {
    apiKey: "AIzaSyDxCTqPRnmw4bitGyR9nKdRQ0AO8e3MlZE",
    authDomain: "unis2-site.firebaseapp.com",
    projectId: "unis2-site",
    storageBucket: "unis2-site.appspot.com", // ✅ Виправлено
    messagingSenderId: "248559645177",
    appId: "1:248559645177:web:1896de80583b98c2130d28",
    measurementId: "G-9ZRE552PM0"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ⚡ Отримуємо елементи з HTML
const userNameElement = document.getElementById("userName");
const scoreElement = document.getElementById("score");
const Tapbutton = document.getElementById("increment");

let userRef = null;

// 🔹 Відстеження авторизації
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "/"; // 🚀 Редирект, якщо користувач не авторизований
        return;
    }

    console.log("🔹 Користувач увійшов:", user.uid);
    userRef = doc(db, "users", user.uid);

    // Отримуємо та оновлюємо `score` в реальному часі
    onSnapshot(userRef, async (docSnap) => {
        if (docSnap.exists()) {
            let currentScore = docSnap.data().score;
            
            // Перевіряємо, чи `score` є числом
            if (typeof currentScore !== "number" || isNaN(currentScore)) {
                console.warn("⚠️ Некоректне значення `score`, оновлюємо...");
                await updateDoc(userRef, { score: 0 }); // Виправляємо
                currentScore = 0;
            }
    
            scoreElement.textContent = currentScore;
        } else {
            await setDoc(userRef, { score: 0 }); // Створюємо документ
            scoreElement.textContent = 0;
        }
    });
    
});

// 🔹 Додавання +1 до `score`
Tapbutton.addEventListener("click", async () => {
    if (!userRef) return;
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        const currentScore = docSnap.data().score;
        await updateDoc(userRef, { score: currentScore + 1 });
    }
});
