import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Конфігурація Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkbg5rtAZ9SV321Djga4xBwsTG2uOUpjw",
    authDomain: "maldenahealth-finally.firebaseapp.com",
    projectId: "maldenahealth-finally",
    storageBucket: "maldenahealth-finally.firebasestorage.app",
    messagingSenderId: "494931005513",
    appId: "1:494931005513:web:72dd11f631433967c9ef98",
    measurementId: "G-YH5DSD3L77"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Ініціалізація Firestore
const db = getFirestore(app);

// Ініціалізація Firebase Authentication
const auth = getAuth(app);

// Отримуємо елементи з DOM
const commentForm = document.getElementById('commentForm');
const commentText = document.getElementById('commentText');
const commentsList = document.getElementById('commentsList');
const videoId = document.getElementById('idVideo').value;  // Отримуємо ID відео з елемента

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;  // Отримуємо UID користувача
        console.log("UID користувача:", uid);

        // Отримуємо нікнейм з Firestore
        const nickname = await getUserNickname(uid);
        console.log("Нікнейм користувача:", nickname);

        // Встановлюємо отриманий нікнейм як ім'я
        document.getElementById('userDisplayName').textContent = nickname;
    } else {
        console.log("Користувач не авторизований");
        document.getElementById('userDisplayName').textContent = 'Не авторизовано';
    }
});

const getUserNickname = async (userId) => {
    try {
        const userDocRef = doc(db, "users", userId);  // Шукаємо документ користувача
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("Отримані дані користувача:", userData);

            // Використовуємо поле name як нікнейм
            return userData.name || 'Без імені';
        } else {
            console.log("Документ користувача не знайдений");
            return 'Без імені';
        }
    } catch (error) {
        console.error("Помилка при отриманні даних користувача:", error);
        return 'Без імені';
    }
};

const loadComments = async () => {
    const commentsSnapshot = await getDocs(query(collection(db, "comments"), orderBy("createdAt", "desc")));
    commentsList.innerHTML = ''; // Очищаємо список перед додаванням нових коментарів

    commentsSnapshot.forEach((doc) => {
        const commentData = doc.data();
        const commentId = doc.id;  // Отримуємо ID коментаря

        // Перевіряємо, чи цей коментар належить поточному відео
        if (commentData.videoId === videoId) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');

            // Створюємо елемент для ніку
            const nameElement = document.createElement('strong');
            nameElement.textContent = commentData.name;

            // Створюємо елемент для тексту коментаря
            const commentContent = document.createElement('p');
            commentContent.textContent = commentData.comment;

            const createdAt = new Date(commentData.createdAt.seconds * 1000); // Перетворюємо час на об'єкт Date
            const currentTime = new Date();
            const timeDifference = currentTime - createdAt;

            let timeAgo = '';

            // Якщо коментар був залишений менше ніж хвилину тому
            if (timeDifference < 60000) {
                const secondsAgo = Math.floor(timeDifference / 1000);  // Обчислюємо кількість секунд
                timeAgo = `${secondsAgo} секунд тому`;
            } else if (timeDifference < 3600000) {
                const minutesAgo = Math.floor(timeDifference / 60000);
                timeAgo = `${minutesAgo} хвилин тому`;
            } else if (timeDifference < 86400000) {
                const hoursAgo = Math.floor(timeDifference / 3600000);
                timeAgo = `${hoursAgo} годин тому`;
            } else if (timeDifference < 2592000000) {
                const daysAgo = Math.floor(timeDifference / 86400000);
                timeAgo = `${daysAgo} днів тому`;
            } else if (timeDifference < 31536000000) {
                const monthsAgo = Math.floor(timeDifference / 2592000000);
                timeAgo = `${monthsAgo} місяців тому`;
            } else {
                timeAgo = `Більше року тому`;
            }

            // Створюємо елемент для часу публікації
            const dateElement = document.createElement('small');
            dateElement.textContent = timeAgo;

            dateElement.style.paddingBottom = '5px';

            // Додаємо всі елементи до коментаря
            commentElement.appendChild(nameElement);
            commentElement.appendChild(commentContent);
            commentElement.appendChild(dateElement);

            // Додаємо коментар до списку
            commentsList.appendChild(commentElement);
        }
    });
};

// Обробник форми для додавання коментаря
commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const comment = commentText.value;
    const user = auth.currentUser;

    if (!user) {
        alert("Будь ласка, увійдіть, щоб залишити коментар!");
        return;
    }

    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (!loggedInUserId) {
        alert("ID користувача не знайдено в localStorage!");
        return;
    }

    // Отримуємо нікнейм користувача з Firestore
    const nickname = await getUserNickname(loggedInUserId);

    if (comment) {
        try {
            await addDoc(collection(db, "comments"), {
                videoId: videoId,
                comment: comment,
                name: nickname,
                createdAt: serverTimestamp(),
            });

            commentText.value = '';
            loadComments();
        } catch (error) {
            console.error("Помилка при додаванні коментаря: ", error);
        }
    } else {
        alert("Будь ласка, введіть текст коментаря!");
    }
});

// Завантажуємо коментарі при завантаженні сторінки
window.onload = loadComments;
