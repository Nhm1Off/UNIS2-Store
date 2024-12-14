import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Ініціалізація Firebase
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

// Отримуємо елементи HTML
const balanceDisplay = document.getElementById("balance");
const one = document.getElementById("1");

one.addEventListener("click", async function () {
    try {
        // Перевірка чи користувач авторизований
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userId = user.uid; // Отримуємо ID авторизованого користувача
                const userRef = doc(db, 'users', userId); // Зсилаємось на документ користувача
                const docSnap = await getDoc(userRef); // Отримуємо дані документа
                
                if (docSnap.exists()) {
                    let currentBalance = docSnap.data().balance || 0; // Якщо balance не визначений, то 0
                    
                    // Оновлення балансу (додаємо 10)
                    await updateDoc(userRef, {
                        balance: currentBalance + 10
                    });
                    
                    // Оновлення балансу на сторінці
                    balanceDisplay.textContent = currentBalance + 10;
                    console.log("Баланс оновлено!");
                } else {
                    console.log("Користувач не знайдений");
                }
            } else {
                console.log("Користувач не авторизований");
            }
        });
    } catch (error) {
        console.error("Помилка при оновленні балансу:", error);
    }
});
