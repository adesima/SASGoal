/* help-popup.js - Varianta de DEBUG */

console.log('>>> TEST SASGOAL: Scriptul help-popup.js a fost incarcat cu succes!');

document.addEventListener('click', function(e) {
    // Verificăm orice click de pe pagină
    // console.log('>>> Click detectat pe elementul:', e.target); 

    // 1. Verificăm butonul de deschidere
    const openBtn = e.target.closest('#help-trigger-btn');
    if (openBtn) {
        console.log('>>> TEST SASGOAL: Ai apasat pe butonul de HELP!');
        const helpPopup = document.getElementById('help-popup');
        
        if (helpPopup) {
            console.log('>>> TEST SASGOAL: Am gasit popup-ul, il deschid...');
            helpPopup.style.display = 'flex';
        } else {
            console.error('>>> TEST SASGOAL: EROARE! Nu gasesc div-ul cu id="help-popup" in pagina!');
        }
    }

    // 2. Verificăm butonul de închidere (X)
    const closeBtn = e.target.closest('#close-help');
    if (closeBtn) {
        console.log('>>> TEST SASGOAL: Ai apasat pe X. Inchid popup-ul.');
        const helpPopup = document.getElementById('help-popup');
        if (helpPopup) helpPopup.style.display = 'none';
    }

    // 3. Verificăm click pe fundal
    if (e.target.id === 'help-popup') {
        console.log('>>> TEST SASGOAL: Ai apasat pe fundal. Inchid popup-ul.');
        e.target.style.display = 'none';
    }
});