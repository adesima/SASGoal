 // Include carousel
fetch('../../components/carousel.html')
    .then(res => res.text())
    .then(data => {
    document.getElementById('carousel-placeholder').innerHTML = data;
    const script = document.createElement('script');
    script.src = '../../js/carousel.js';
    document.body.appendChild(script);
    });

const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');

let currentIndex = 0;
let interval;

// Funcție pentru afișarea imaginii curente
function showSlide(index) {
  if (index >= items.length) index = 0;
  if (index < 0) index = items.length - 1;
  currentIndex = index;

  const offset = -index * 100;
  document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Auto slide la fiecare 10 secunde
function startAutoSlide() {
  interval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 10000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

// Evenimente pentru butoanele de control
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    showSlide(currentIndex - 1);
    startAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    showSlide(currentIndex + 1);
    startAutoSlide();
  });
}

// Evenimente pentru buline
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    stopAutoSlide();
    showSlide(index);
    startAutoSlide();
  });
});

// Funcționalitate swipe pentru mobil
let startX = 0;
carousel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    stopAutoSlide();
    if (diff > 0) showSlide(currentIndex + 1); // swipe left
    else showSlide(currentIndex - 1); // swipe right
    startAutoSlide();
  }
});

// Inițializare
showSlide(0);
startAutoSlide();
