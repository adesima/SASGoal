// fetch('/components/header.html')
//                 .then(response => response.text())
//                 .then(data => {
//                     document.getElementById('header-placeholder').innerHTML = data;

//                     const searchBtn = document.getElementById('mobile-search-btn');
//                     const searchWrapper = document.getElementById('search-wrapper');
//                     const searchInput = document.getElementById('search-input');

//                     if (searchBtn && searchWrapper) {
//                         // Când dai click pe lupă
//                         searchBtn.addEventListener('click', (e) => {
//                             e.stopPropagation(); // Oprește click-ul să se ducă mai departe
//                             searchWrapper.classList.toggle('active'); // Activează/Dezactivează clasa CSS
                            
//                             // Punem cursorul automat în input pentru a scrie direct
//                             if (searchWrapper.classList.contains('active') && searchInput) {
//                                 searchInput.focus();
//                             }
//                         });

//                         // Când dai click oriunde în afara header-ului, închidem search-ul
//                         document.addEventListener('click', (e) => {
//                             if (!searchWrapper.contains(e.target)) {
//                                 searchWrapper.classList.remove('active');
//                             }
//                         });
//                     }
//                 });

// document.addEventListener('DOMContentLoaded', () => {
//     const searchBtn = document.getElementById('mobile-search-btn');
//     const searchWrapper = document.getElementById('search-wrapper');
//     const searchInput = document.getElementById('search-input');

//     // Deschide search-ul pe mobil
//     searchBtn.addEventListener('click', (e) => {
//         searchWrapper.classList.add('active');
//         document.body.classList.add('search-is-open');
//         searchInput.focus(); // Pune cursorul automat in input
//         e.stopPropagation();
//     });

//     // Inchide search-ul daca dai click oriunde in afara lui
//     document.addEventListener('click', (e) => {
//         if (searchWrapper.classList.contains('active')) {
//             if (!searchWrapper.contains(e.target)) {
//                 searchWrapper.classList.remove('active');
//                 document.body.classList.remove('search-is-open');
//             }
//         }
//     });
// });


fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
        // 1. Injectăm Header-ul în pagină
        document.getElementById('header-placeholder').innerHTML = data;

        // ============================================================
        // 2. CONFIGURARE PAGINI PENTRU CĂUTARE (MODIFICĂ LINKURILE AICI)
        // ============================================================
        const sitePages = [
            { 
                url: '/pages/leagues/la-liga/la-liga.html', 
                keywords: ['laliga', 'la liga', 'spania'] 
            },
            { 
                url: '/pages/leagues/la-liga/teams/barcelona.html', 
                keywords: ['barcelona', 'barca', 'fc barcelona'] 
            },
            { 
                url: '/pages/leagues/superliga/superliga.html', 
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