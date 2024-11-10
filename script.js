const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');
        const openPopup = document.getElementById('openPopup');
        const closePopup = document.getElementById('closePopup');

        // Функція відкриття спливаючого вікна
        openPopup.addEventListener('click', function(event) {
            event.preventDefault(); // Забороняємо перехід по посиланню
            popup.style.display = 'block';
            overlay.style.display = 'block';
        });

        // Функція закриття спливаючого вікна
        closePopup.addEventListener('click', function() {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });

        // Закриття вікна при натисканні на затінення
        overlay.addEventListener('click', function() {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }); 

        document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault();
        
            const form = event.target;
            const data = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value,
            };
        
            fetch("https://www.unis2.store/3dmoonlamp.html", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then(response => response.text())
            .then(data => {
                alert("Ваші дані надіслано!");
                form.reset();
                document.getElementById('popup').style.display = 'none';
                document.getElementById('overlay').style.display = 'none';
            })
            .catch(error => {
                alert("Сталася помилка. Спробуйте ще раз.");
                console.error("Помилка:", error);
            });
        });
