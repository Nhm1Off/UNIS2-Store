const likeBtn = document.getElementById('likeBtn');
const likeImg = document.getElementById('likeImg');

let liked = false;  // Спочатку лайк не поставлений

function AnimLikeImg() {
    // Скидаємо поточну анімацію
    likeImg.style.animation = 'none';

    // Невелика затримка перед початком анімації
    setTimeout(() => {
        likeImg.style.animation = 'like-animation 0.6s ease';

        // Після завершення анімації змінюємо картинку
        likeImg.addEventListener('animationend', () => {
            if (liked) {
                // Якщо лайк вже поставлений, скидаємо картинку на "не лайк"
                likeImg.src = 'https://i.ibb.co/4mLP4WC/image.png';  // Початкова картинка
                liked = false;  // Скидаємо стан лайка
            } else {
                // Якщо лайк не поставлений, ставимо картинку лайка
                likeImg.src = 'https://i.ibb.co/wpqbNmx/image.png';  // Лайкнута картинка
                liked = true;  // Встановлюємо стан лайка
            }
        }, { once: true }); // Запускаємо обробник лише один раз після анімації
    }, 10);
}

// Додаємо обробник події на натискання
likeBtn.addEventListener("click", AnimLikeImg);
