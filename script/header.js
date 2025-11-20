fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        // 1. Injectăm Header-ul în pagină
        document.getElementById('header-placeholder').innerHTML = data;

        // ============================================================
        // 2. CONFIGURARE PAGINI PENTRU CĂUTARE (MODIFICĂ LINKURILE AICI)
        // ============================================================
        const sitePages = [
            { 
                url: 'pages/leagues/la-liga/la-liga.html', 
                keywords: ['laliga', 'la liga', 'spania'] 
            },
            { 
                url: 'pages/leagues/la-liga/teams/barcelona.html', 
                keywords: ['barcelona', 'barca', 'fc barcelona'] 
            },
            { 
                url: 'pages/leagues/superliga/superliga.html', 
                keywords: ['superliga', 'liga 1', 'romania'] 
            },
            // Poți adăuga alte pagini aici urmând modelul de mai sus
        ];

        // ============================================================
        // 3. SELECTARE ELEMENTE
        // ============================================================
        const searchBtn = document.getElementById('mobile-search-btn'); // Lupa de mobil
        const searchWrapper = document.getElementById('search-wrapper');
        const searchInput = document.getElementById('search-input');
        const submitBtn = document.querySelector('.search-submit-btn'); // Butonul de săgeată/lupă din input

        // ============================================================
        // 4. FUNCȚIA DE CĂUTARE
        // ============================================================
        function executeSearch() {
            if (!searchInput) return;
            
            const query = searchInput.value.toLowerCase().trim(); // Curățăm textul

            if (query.length === 0) return; // Nu facem nimic dacă e gol

            // Căutăm potriviri în lista noastră
            const result = sitePages.find(page => {
                return page.keywords.some(keyword => query.includes(keyword));
            });

            if (result) {
                window.location.href = result.url; // Redirect dacă găsim
            } else {
                alert('Nu am găsit rezultate pentru: ' + query); // Sau poți face redirect către 404
            }
        }

        // ============================================================
        // 5. EVENT LISTENERS (LOGICA DE CLICK)
        // ============================================================

        // A. Click pe Lupa de Mobil (Deschide/Închide bara)
        if (searchBtn && searchWrapper) {
            searchBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                searchWrapper.classList.toggle('active');
                document.body.classList.toggle('search-is-open');
                
                // Punem cursorul automat în input
                if (searchWrapper.classList.contains('active') && searchInput) {
                    searchInput.focus();
                }
            });
        }

        // B. Click oriunde în afară (Închide bara)
        document.addEventListener('click', (e) => {
            if (searchWrapper && searchWrapper.classList.contains('active')) {
                if (!searchWrapper.contains(e.target)) {
                    searchWrapper.classList.remove('active');
                    document.body.classList.remove('search-is-open');
                }
            }
        });

        // C. Apăsarea tastei ENTER în input -> Execută căutarea
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    executeSearch();
                }
            });
        }

        // D. Click pe iconița din interiorul input-ului -> Execută căutarea
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                executeSearch();
            });
        }
    })
    .catch(err => console.error('Eroare la încărcarea header-ului:', err));