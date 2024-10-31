(function() {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const footer = document.querySelector('footer');
        const p = document.createElement('p');
        p.textContent = `Время загрузки страницы: ${loadTime} мс`;
        footer.appendChild(p);
    });
})();


(function() {
    const currentUrl = document.location.href;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });
})();