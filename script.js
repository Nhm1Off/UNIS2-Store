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

