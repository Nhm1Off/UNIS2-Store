// Отримуємо елементи
const filtersButton = document.getElementById("filters");
const filtersPopup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const applyFiltersButton = document.getElementById("applyFilters");
const productList = document.getElementById("productList");
const clearFiltersButton = document.getElementById("clearFilters");
const categoryCheckboxes = document.querySelectorAll(".categoryCheckbox");

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

// Скинути фільтри
clearFiltersButton.addEventListener("click", () => {
    // Скидаємо значення полів ціни
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";

    // Знімаємо галочки з усіх категорій
    categoryCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    // Показуємо всі товари
    const products = productList.getElementsByClassName("product");
    Array.from(products).forEach((product) => {
        product.style.display = "block";
    });

    // Закриваємо попап
    filtersPopup.style.display = "none";
});

// Обробка змін у категоріях
categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        // Якщо хоча б один конкретний чекбокс вибрано, знімаємо галочку з "Усі категорії"
        if (Array.from(categoryCheckboxes).some((cb) => cb.checked && cb !== allCategoriesCheckbox)) {
            allCategoriesCheckbox.checked = false;
        } else {
            // Якщо жоден конкретний чекбокс не вибрано, ставимо галочку на "Усі категорії"
            allCategoriesCheckbox.checked = true;
        }
    });
});
