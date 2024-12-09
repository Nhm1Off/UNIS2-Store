const Popup = document.getElementById("popup-header");

const BurgerMenuBtn = document.getElementById("burgerMenuBtn");
const closeOverlay = document.getElementById("closeOverlay");


Popup.style.display = "none";

function OpenPopup() {
    Popup.style.display = "inline-block"; 
    BurgerMenuBtn.style.display = "none";
}

function ClosePopup() {
    Popup.style.display = "none";
    BurgerMenuBtn.style.display = "flex";
}

BurgerMenuBtn.addEventListener("click", OpenPopup)
closeOverlay.addEventListener("click", ClosePopup)
