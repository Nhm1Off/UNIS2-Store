google.accounts.id.initialize({
    client_id: "672903744712-5s97ekr693ere7g2vk7c89jc9cacvugt.apps.googleusercontent.com",
    callback: handleCredentialResponse
});

google.accounts.id.renderButton(
    document.querySelector(".g_id_signin"),
    { theme: "outline", size: "large" }
);

// Обробка відповіді після успішного входу
function handleCredentialResponse(response) {
    // Отримання ID токену з response
    const token = response.credential;

    // Використовуємо токен для отримання даних користувача
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
        .then((res) => res.json())
        .then((data) => {
            // Вивести дані користувача (аватар та ім'я)
            const avatar = data.picture;
            const name = data.name;

            // Зберігаємо дані у елементах на сторінці
            document.getElementById('profile-avatar').src = avatar;
            document.getElementById('profile-name').textContent = `Hello, ${name}`;

            // Показуємо профіль
            document.getElementById('profile-info').style.display = "block";
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });
}