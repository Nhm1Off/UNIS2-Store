// Отримуємо елементи
const filtersButton = document.getElementById("filters");
const filtersPopup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const applyFiltersButton = document.getElementById("applyFilters");
const productList = document.getElementById("productList");
const clearFiltersButton = document.getElementById("clearFilters");

// Відкрити попап
filtersButton.addEventListener("click", () => {
    filtersPopup.style.display = "block";
});

// Закрити попап
closePopup.addEventListener("click", () => {
    filtersPopup.style.display = "none";
});

// Додатково: Закрити попап при кліку за його межами
filtersPopup.addEventListener("click", (event) => {
    if (event.target === filtersPopup) {
        filtersPopup.style.display = "none";
    }
});

// Фільтрувати товари
applyFiltersButton.addEventListener("click", () => {
    // Зчитуємо вибрані категорії
    const selectedCategories = Array.from(
        document.querySelectorAll(".categoryCheckbox:checked")
    ).map((checkbox) => checkbox.value);

    // Зчитуємо мінімальну та максимальну ціну
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

    const products = productList.getElementsByClassName("product");

    // Якщо жодна категорія не вибрана, показуємо всі товари
    const noCategorySelected = selectedCategories.length === 0 || selectedCategories.includes("all");

    Array.from(products).forEach((product) => {
        const productPrice = parseFloat(product.getAttribute("data-price")) || 0;

        // Перевірка категорій
        const matchesCategory =
            noCategorySelected ||
            selectedCategories.some((category) =>
                product.classList.contains(category)
            );

        // Перевірка ціни
        const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

        // Відображення товарів
        if (matchesCategory && matchesPrice) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

    // Закриваємо попап після застосування фільтрів
    filtersPopup.style.display = "none";
});

clearFiltersButton.addEventListener("click", () => {
    // Скидаємо значення мінімальної та максимальної ціни
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";

    // Знімаємо всі галочки в категоріях
    const checkboxes = document.querySelectorAll(".categoryCheckbox");
    checkboxes.forEach((checkbox) => {
        checkbox.checked = checkbox.value === "all"; // Установлюємо "Усі" як вибрану
    });

    // Показуємо всі товари
    const products = productList.getElementsByClassName("product");
    Array.from(products).forEach((product) => {
        product.style.display = "block";
    });

    // Закриваємо попап, якщо він відкритий
    filtersPopup.style.display = "none";
});
