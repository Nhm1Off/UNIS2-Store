// Отримуємо елементи
const modal = document.getElementById("modal");
const openModalLinks = document.querySelectorAll(".open-modal"); // Всі кнопки "Купити" (у навігації і в контенті)
const closeModal = document.querySelector(".close");
const orderForm = document.getElementById("orderForm");

// Відкриваємо модальне вікно при кліку на будь-яку кнопку "Купити"
openModalLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "block";
    });
});

// Закриваємо модальне вікно при кліку на "x"
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

// Закриваємо модальне вікно при кліку за межі вікна
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Обробка форми та відправка даних у Telegram
orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const surname = document.getElementById("surname").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const telegram = document.getElementById("telegram").value;

    const message = `
        Замовлення від:
        Прізвище: ${surname}
        Ім'я: ${name}
        Номер телефону: ${phone}
        Telegram: @${telegram}
    `;

    // Відправляємо дані до Telegram-бота
    fetch(`https://api.telegram.org/bot<твій-бот-token>/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: "<твій-чат-id>",
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Ваші дані відправлені успішно!");
        } else {
            alert("Сталася помилка під час відправки.");
        }
    })
    .catch(error => {
        alert("Помилка з'єднання з сервером.");
        console.error("Error:", error);
    });

    // Закриваємо модальне вікно після відправки
    modal.style.display = "none";
});
