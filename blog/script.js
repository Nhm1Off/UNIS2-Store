const OpenBurgerMenu = document.getElementById("burgerMenu");
const Popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

Popup.style.display = "none";

function OpenPopup() {
    Popup.style.display = "inline";
    OpenBurgerMenu.style.display = "none";
}

function ClosePopup() {
    Popup.style.display = "none";
    OpenBurgerMenu.style.display = "block";
}

OpenBurgerMenu.addEventListener("click", OpenPopup)
closePopup.addEventListener("click", ClosePopup)