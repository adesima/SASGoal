fetch('components/navbar.html')
    .then(response => response.text())
    .then(data => {
        const placeholder = document.getElementById('navbar-placeholder');
        placeholder.innerHTML = data;

        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('nav-links');
        const headerBurgerSpot = document.getElementById('mobile-burger-placeholder');
        const navbarContainer = placeholder.querySelector('.navbar-container');

        // Dacă suntem pe ecran mic, mută burgerul în header și "ascunde" navbar-ul gol
        const isMobile = () => window.innerWidth <= 1024;

        function relocateBurger() {
        if (!burger || !headerBurgerSpot || !navbarContainer) return;
        if (isMobile()) {
            // mută butonul burger în header
            headerBurgerSpot.appendChild(burger);
            // ascundem vizual bara navbar care a rămas goală
            navbarContainer.classList.add('collapsed');
        } else {
            // readucem burgerul la locul lui pe desktop
            navbarContainer.insertBefore(burger, navbarContainer.firstChild);
            navbarContainer.classList.remove('collapsed');
        }
        }

        // initial relocate
        relocateBurger();

        // react to resize (schimbare orientare / rotire)
        window.addEventListener('resize', relocateBurger);

        if (burger && navLinks) {
        // deschidere/închidere
        burger.addEventListener('click', (e) => {
            e.stopPropagation(); // nu lăsa click-ul să ajungă la document
            const isActive = navLinks.classList.toggle('active');
            burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        // Închiderea meniului la click în afara meniului sau butonului
        document.addEventListener('click', (e) => {
            // dacă click-ul nu e în navLinks și nu e pe burger -> închidem
            if (!navLinks.contains(e.target) && e.target !== burger && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            }
        });

        // click pe link închide (utile pentru mobile)
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            navLinks.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            }
        });
        } else {
        console.warn('Burger sau navLinks nu găsite după injectare.');
        }
    })
.catch(err => console.error('Failed to load navbar:', err));