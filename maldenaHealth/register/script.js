window.onload = function() {
    google.accounts.id.initialize({
        client_id: "672903744712-1dhajcnv9bm36bbbc746pdi3cs0l2r5m.apps.googleusercontent.com", // Вставте ваш Client ID
        callback: handleCredentialResponse
    });

    google.accounts.id.prompt();
};

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // Надсилаємо токен на сервер для перевірки
    fetch('https://www.unis2.store/maldenaHealth/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        console.log('User successfully authenticated:', data);
        alert('You are logged in');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error during sign-in');
    });
}
