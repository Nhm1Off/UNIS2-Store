import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

const provider = new GoogleAuthProvider();

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        message.style.opacity = 0;
    }, 5000);
}

const googleSignInButton = document.getElementById("googleSignInButton");

const signUp = document.getElementById("registerBtn");

googleSignInButton.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("User signed in: ", user);

        // Перевірка, чи існує користувач у Firestore
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
            // Якщо користувач не існує в базі, додаємо його
            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                balance: 0,  // Додаткові поля, якщо потрібно
                cardStatus: false  // Статус картки
            });

            console.log("User added to Firestore");
        }

        // Зберігаємо ID користувача в localStorage
        localStorage.setItem("loggedInUserId", user.uid);

        // Перенаправлення на домашню сторінку або в профіль
        window.location.href = "https://unis2.store/maldenaHealth/profile";  // Змінити на ваш шлях
    } catch (error) {
        console.error("Error during Google sign-in: ", error.message);
    }
});


signUp.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("Remail").value;
    const password = document.getElementById("Rpassword").value;
    const name = document.getElementById("name").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                name: name
            };
            // showMessage("Акаунт створено успішно!", "signUpMessage");
            console.log("Email:", email);
            console.log("Password:", password);
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    showMessage("Акаунт створено успішно! Тепер увійдіть в нього нижче", "signUpMessage");
                })
                .catch((error) => {
                    console.error("error while writing document", error);
                })
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                showMessage("Акаунт з таким e-mail вже існує", "signUpMessage");
            } else {
                showMessage("Неможливо створити акаунт", "signUpMessage");
            }
        })
})

const signIn = document.getElementById("SignInBtn");

signIn.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("SignInEmail").value;
    const password = document.getElementById("Lpassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage("Ви успішно ввійшли в акаунт!", "signInMessage")
            const user = userCredential.user;
            localStorage.setItem("loggedInUserId", user.uid);
            window.location.href = "../../profile"; // github https://unis2.store/maldenaHealth/profile
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                showMessage("Не вірний пароль або e-mail", "signInMessage");
            }
            else if(errorCode === "auth/user-not-found") {
                showMessage("Такого акаунту не існує", "signInMessage");
            }
            else {
                showMessage("Помилка входу", "signInMessage")
                console.error("Sign-in error: ", error);
            }
        })
})

