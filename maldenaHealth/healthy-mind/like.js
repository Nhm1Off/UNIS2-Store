// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

const likeBtn = document.getElementById('likeBtn');
const likeImg = document.getElementById('likeImg');
const likeCountText = document.getElementById('likeCount');

let liked = false;
let videoId = "video1"; // Unique identifier for the video
let likeLock = false; // Prevent rapid clicking

async function fetchLikeData() {
  const docRef = doc(db, "likes", videoId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    likeCountText.textContent = data.count || 0;
    liked = data.users && data.users[auth.currentUser?.uid] ? true : false;
    likeImg.src = liked ? 'https://i.ibb.co/wpqbNmx/image.png' : 'https://i.ibb.co/tMtHPp3/image.png';
  } else {
    await setDoc(docRef, { count: 0, users: {} });
    likeCountText.textContent = 0;
  }
}

async function toggleLike() {
  if (likeLock) return;
  likeLock = true;

  if (!auth.currentUser) {
    alert("Увійдіть, щоб ставити лайки!");
    likeLock = false;
    return;
  }

  const docRef = doc(db, "likes", videoId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const userLikes = data.users || {};
    let likeCount = data.count || 0;

    if (liked) {
      likeCount = Math.max(0, likeCount - 1);
      delete userLikes[auth.currentUser.uid];
    } else {
      likeCount++;
      userLikes[auth.currentUser.uid] = true;
    }

    await updateDoc(docRef, { count: likeCount, users: userLikes });
    liked = !liked;
    likeCountText.textContent = likeCount;
    likeImg.src = liked ? 'https://i.ibb.co/wpqbNmx/image.png' : 'https://i.ibb.co/tMtHPp3/image.png';
  }

  likeLock = false;
}

function AnimLikeImg() {
  if (likeLock) return;
  likeImg.style.animation = 'none';

  setTimeout(() => {
    likeImg.style.animation = 'like-animation 0.6s ease';
    toggleLike();
  }, 10);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchLikeData();
  } else {
    likeCountText.textContent = "0";
    liked = false;
    likeImg.src = 'https://i.ibb.co/tMtHPp3/image.png';
  }
});

likeBtn.addEventListener("click", AnimLikeImg);
