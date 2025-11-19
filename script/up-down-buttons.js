
// Insert and wire the up/down buttons using fetch()
(function () {
    function insertUpDownButtons() {
        // Look for a placeholder element; add to the body by default
        const placeholder = document.querySelector('[data-up-down-placeholder]') || document.createElement('div');
        if (!placeholder.parentNode) document.body.appendChild(placeholder);

        fetch('/components/up-down-buttons.html')
            .then(resp => {
                if (!resp.ok) throw new Error('Failed to fetch up-down-buttons');
                return resp.text();
            })
            .then(html => {
                placeholder.innerHTML = html;

                const goTop = document.getElementById('goTopBtn');
                const goBottom = document.getElementById('goBottomBtn');

                if (goTop) {
                    goTop.addEventListener('click', () => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    });
                }

                if (goBottom) {
                    goBottom.addEventListener('click', () => {
                        window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
                    });
                }
            })
            .catch(err => console.warn('up-down-buttons failed:', err));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertUpDownButtons);
    } else {
        insertUpDownButtons();
    }
})();