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
    const currentPath = document.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
})();