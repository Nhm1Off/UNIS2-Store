const Popup = document.getElementById("popup-header");
const leftMenu = document.querySelector(".left-menu");

const BurgerMenuBtn = document.getElementById("burgerMenuBtn");
const closeOverlay = document.getElementById("closeOverlay");


function OpenPopup() {
    Popup.style.display = "inline";

    Popup.style.opacity = 0;
    setTimeout(() => {
        Popup.style.opacity = 1;
        BurgerMenuBtn.style.display = "none";
    }, 20);
}

function ClosePopup() {
    Popup.style.opacity = 1;
    setTimeout(() => {
        Popup.style.opacity = 0;
        BurgerMenuBtn.style.display = "flex";
        setTimeout(() => {
            Popup.style.display = "none";
        }, 280);
    }, 20);
}

BurgerMenuBtn.addEventListener("click", OpenPopup)
closeOverlay.addEventListener("click", ClosePopup)
