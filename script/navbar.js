fetch('components/navbar.html')
    .then(response => response.text())
    .then(data => {
        const placeholder = document.getElementById('navbar-placeholder');
        placeholder.innerHTML = data;

        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('nav-links');
        const headerBurgerSpot = document.getElementById('mobile-burger-placeholder');
        const navbarContainer = placeholder.querySelector('.navbar-container');
        
        // Referinte pentru butoanele de user (Profil, Tema, Help)
        // Le cautam in documentul principal (header.html e deja incarcat)
        const headerUserButtons = document.querySelector('.user-buttons'); 
        const mobileUserActionsSpot = document.getElementById('mobile-user-actions');

        // Dacă suntem pe ecran mic (< 1024px sau cat ai setat tu break-point-ul)
        // Nota: In CSS ai folosit 600px pentru header, dar 1024px pentru navbar.
        // E bine sa le sincronizezi. Aici folosesc 1024px ca sa fiu sigur.
        const isMobile = () => window.innerWidth <= 1024;

        function relocateElements() {
            if (!burger || !headerBurgerSpot || !navbarContainer) return;

            if (isMobile()) {
                // 1. Mută BURGERUL în header
                if (!headerBurgerSpot.contains(burger)) {
                     headerBurgerSpot.appendChild(burger);
                     navbarContainer.classList.add('collapsed');
                }

                // 2. Mută BUTOANELE DE USER (Profil, Tema) în meniul Burger
                if (headerUserButtons && mobileUserActionsSpot) {
                    // Mutam toti copiii din header container in navbar container
                    while (headerUserButtons.firstChild) {
                        mobileUserActionsSpot.appendChild(headerUserButtons.firstChild);
                    }
                }

            } else {
                // 1. Readucem BURGERUL în navbar (desktop)
                if (!navbarContainer.contains(burger)) {
                    navbarContainer.insertBefore(burger, navbarContainer.firstChild);
                    navbarContainer.classList.remove('collapsed');
                }

                // 2. Readucem BUTOANELE DE USER în Header
                if (headerUserButtons && mobileUserActionsSpot) {
                    while (mobileUserActionsSpot.firstChild) {
                        headerUserButtons.appendChild(mobileUserActionsSpot.firstChild);
                    }
                }
            }
        }

        // initial relocate
        relocateElements();

        // react to resize
        window.addEventListener('resize', relocateElements);

        if (burger && navLinks) {
            burger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = navLinks.classList.toggle('active');
                burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                
                // Cand meniul e deschis, blocam scroll-ul pe body (optional, dar recomandat)
                if(isActive) document.body.style.overflow = 'hidden';
                else document.body.style.overflow = '';
            });

            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && e.target !== burger && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });

            navLinks.addEventListener('click', (e) => {
                // Inchidem meniul daca dam click pe un link sau buton
                // Dar verificam sa nu inchidem daca dam click pe Theme (ca poate vrem sa ramanem in meniu)
                // Totusi, pentru simplitate, il inchidem.
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                    // Un mic delay ca sa vedem animatia butonului daca e cazul
                    // Sau il inchidem direct
                    // navLinks.classList.remove('active');
                    // burger.setAttribute('aria-expanded', 'false');
                    // document.body.style.overflow = '';
                }
            });
        } else {
            console.warn('Burger sau navLinks nu găsite după injectare.');
        }
    })
    .catch(err => console.error('Failed to load navbar:', err));