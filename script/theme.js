function updateIcons() {
  if (lightMode === 1) { // light mode
    document.getElementById('profile-icon').src = '/images/buttons/user-icon-lm.png';
    document.getElementById('help-icon').src = '/images/buttons/help-icon-lm.png';
    document.getElementById('theme-icon').src = '/images/buttons/theme-icon-lm.png';
    document.getElementById('search-icon').src = '/images/buttons/search-icon-lm.png';
    document.getElementById('logo').src = '/images/SASGoal-lm.png';
  } else { // dark mode
    document.getElementById('profile-icon').src = '/images/buttons/user-icon-dm.png';
    document.getElementById('help-icon').src = '/images/buttons/help-icon-dm.png';
    document.getElementById('theme-icon').src = '/images/buttons/theme-icon-dm.png';
    document.getElementById('search-icon').src = '/images/buttons/search-icon-dm.png';
    document.getElementById('logo').src = '/images/SASGoal-dm.png';
  }
}

let lightMode = 0; // 0 = dark, 1 = light

function toggleTheme() {
  const body = document.body;
  lightMode = 1 - lightMode;

  if (lightMode === 1) {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }

  localStorage.setItem('lightMode', lightMode);

  // actualizează iconițele
  updateIcons();
}

// când pagina s-a încărcat complet (inclusiv headerul)
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('lightMode');
  if (savedMode === '1') {
    document.body.classList.add('light-mode');
    lightMode = 1;
  }

  // leagă butonul abia după ce headerul e injectat
  setTimeout(() => {
    const toggleBtn = document.getElementById('theme-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }

    // setează iconițele corecte la început
    updateIcons();
  }, 100); // mic delay ca să fim siguri că headerul s-a încărcat
});
