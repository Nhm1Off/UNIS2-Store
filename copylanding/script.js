let currentIndex = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  // Обчислюємо новий індекс слайда
  currentIndex = (currentIndex + step + totalSlides) % totalSlides;

  // Переміщаємо слайди в залежності від нового індексу
  const slideWidth = slides[0].clientWidth;
  document.querySelector('.slides').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Функція для автоматичного перемикання слайдів кожні 5 секунд
setInterval(() => moveSlide(1), 7000);
