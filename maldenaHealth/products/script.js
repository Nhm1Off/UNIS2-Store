const BuyPopupOpen = document.getElementById("buy-popup");
const PopupBuy = document.getElementById("popup-buy"); // Виправлено метод
const PopupClose = document.getElementById("closePopup");

// Попап купівлі 
BuyPopupOpen.addEventListener("click", function () {
    PopupBuy.style.display = "block";
});

PopupClose.addEventListener("click" , function () {
    PopupBuy.style.display = "none";
});

