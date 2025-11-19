document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.carousel-slider');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.indicator-dot');

    let counter = 0;
    const totalSlides = slides.length;

    // Funcția principală de actualizare a caruselului
    const updateCarousel = () => {
        // Mutăm slider-ul cu un procent (0%, -100%, -200% etc.)
        slider.style.transform = `translateX(-${counter * 100}%)`;

        // Actualizăm bulinele active
        dots.forEach(dot => dot.classList.remove('active'));
        dots[counter].classList.add('active');
    };

    // Butonul Next
    nextBtn.addEventListener('click', () => {
        counter++;
        if (counter >= totalSlides) {
            counter = 0; // Resetăm la prima imagine
        }
        updateCarousel();
    });

    // Butonul Prev
    prevBtn.addEventListener('click', () => {
        counter--;
        if (counter < 0) {
            counter = totalSlides - 1; // Mergem la ultima imagine
        }
        updateCarousel();
    });

    // Funcționalitate pentru buline (dots)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            counter = index;
            updateCarousel();
        });
    });

    // Opțional: Auto-play (schimbă imaginea singur la 5 secunde)
    let autoSlide = setInterval(() => {
        nextBtn.click();
    }, 3500);

    // Oprim auto-play când userul pune mouse-ul pe carusel
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    // Repornim auto-play când userul ia mouse-ul
    container.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });
});