import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, getDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

const activateCardButton = document.getElementById("activateCard");
const messageAvair = document.getElementById("messageAvair");  // отримуємо елемент для повідомлення
const messageContainer = document.querySelector(".messageNot");  // Отримуємо контейнер повідомлення

const Overlay = document.querySelector(".messageNotBackdrop");

activateCardButton.addEventListener("click", async () => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const currentBalance = userData.balance || 0; // Баланс користувача
            const cardStatus = userData.cardStatus || false; // Статус картки

            if (cardStatus || currentBalance >= 150) {
                // Якщо картка вже активована або баланс >= 150
                await updateDoc(docRef, {
                    cardStatus: true // Активуємо картку
                });

                // Зміна статусу картки на сторінці
                document.getElementById("activeStatus").innerText = "Активна";
                
                // Очистка повідомлення, якщо картка активована
                messageAvair.innerText = "";
                messageContainer.style.display = "none";
                Overlay.style.display = "none"; // Сховуємо контейнер повідомлення

                // Приховуємо кнопку, якщо картка активована
                activateCardButton.style.display = "none";  // Приховуємо кнопку
            } else {
                // Якщо баланс менший за 150
                messageAvair.innerText = "Не вдалося активувати подарункову карту, тому, що ваш баланс менший за 150 грн";

                // Робимо контейнер повідомлення видимим і через 5 секунд приховуємо
                messageContainer.style.display = "block"; // Відображаємо контейнер повідомлення
                Overlay.style.display = "block";
                
                setTimeout(() => {
                    messageContainer.style.display = "none"; // Сховуємо через 4 секунди
                    Overlay.style.display = "none";
                }, 4000);
            }
        } else {
            console.log("Користувач не знайдений в базі даних");
        }
    } else {
        console.log("User Id not found in Local Storage");
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = localStorage.getItem("loggedInUserId");
        
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const cardStatus = userData.cardStatus || false;
                    
                    // Якщо картка вже активована, відображаємо статус "Активна"
                    if (cardStatus) {
                        document.getElementById("activeStatus").innerText = "Активна";
                        // Якщо картка активована, приховуємо кнопку
                        activateCardButton.style.display = "none";
                    } else {
                        document.getElementById("activeStatus").innerText = "Не активна";
                    }
                } else {
                    console.log("No document found with matching id");
                }
            })
            .catch((error) => {
                console.log("Error getting document", error);
            });
        }
    }
});
