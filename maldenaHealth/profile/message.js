const closeMessage = document.getElementById("closeMessage");

const messageNot = document.querySelector(".messageNot");
const messageNotBackdrop = document.querySelector(".messageNotBackdrop");

const messageAvair = document.getElementById("messageAvair");

const infoBalance = document.getElementById("infoBalance");

function closeMessages() {
    messageNot.style.display = "none";
    messageNotBackdrop.style.display = "none";
}

function infoBalanceOpen() {
    messageNot.style.display = "block";
    messageNotBackdrop.style.display = "block";

    messageAvair.innerText = "Заробляйте баланс, беручи участь у наших подіях";

    setTimeout(() => {
        messageNot.style.display = "none";
        messageNotBackdrop.style.display = "none";
    }, 5000);
}

closeMessage.addEventListener("click", closeMessages)
infoBalance.addEventListener("click", infoBalanceOpen)