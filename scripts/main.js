(function () {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const footer = document.querySelector('footer');
        const p = document.createElement('p');
        p.textContent = `Время загрузки страницы: ${loadTime} мс`;
        footer.appendChild(p);
    });
})();

(function () {
    const currentUrl = document.location.href;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('table-form');
    const tableBody = document.getElementById('table-body');
    const rowTemplate = document.getElementById('row-template');
    let entries = JSON.parse(localStorage.getItem('tableEntries')) || [];

    function saveToLocal() {
        localStorage.setItem('tableEntries', JSON.stringify(entries));
    }

    function generateTable() {
        tableBody.innerHTML = '';

        entries.forEach((entry, index) => {
            const row = rowTemplate.content.cloneNode(true);
            row.querySelector('.description').textContent = entry.description;
            row.querySelector('.date').textContent = entry.date;
            row.querySelector('.mileage').textContent = entry.mileage;
            row.querySelector('.cost').textContent = entry.cost;

            const deleteButton = row.querySelector('.delete-button');
            deleteButton.setAttribute('data-index', index);
            deleteButton.addEventListener('click', deleteEntry);

            tableBody.appendChild(row);
        });
    }

    function deleteEntry(event) {
        const index = event.target.getAttribute('data-index');
        entries.splice(index, 1);
        saveToLocal();
        generateTable();
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const mileage = formData.get('mileage');
        const cost = formData.get('cost');

        if (!/^[1-9]\d*$/.test(mileage) || !/^[1-9]\d*$/.test(cost)) {
            alert('Пробег и стоимость должны быть положительными числами.');
            return;
        }

        const entry = {
            description: formData.get('description'),
            date: formData.get('date'),
            mileage: mileage,
            cost: cost
        };

        entries.push(entry);
        saveToLocal();
        generateTable();
        form.reset();
    });

    generateTable();
});

document.getElementById('profile-icon').addEventListener('click', () => {
    window.location.href = 'profile.html';
});

async function fetchImageUrl(brandUrl) {
    try {
        const response = await fetch(`http://localhost:3000/fetch-image?url=${encodeURIComponent(brandUrl)}`);
        const data = await response.json();
        return data.imageUrl;
    } catch (error) {
        console.error('Error fetching image URL:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const brandLinks = document.querySelectorAll('ul li a');
    brandLinks.forEach(async (link) => {
        const brandUrl = link.getAttribute('data-url');
        const imageUrl = await fetchImageUrl(brandUrl);

        if (imageUrl) {
            link.querySelector('img').src = imageUrl;
            console.log(`Image URL set for ${brandUrl}: ${imageUrl}`);
        } else {
            console.error('Image URL not found for', brandUrl);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Бесконечный слайд
        slidesPerView: 3, // Количество видимых слайдов
        spaceBetween: 20, // Расстояние между слайдами
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000, // Автоматическое пролистывание каждые 3 секунды
            disableOnInteraction: false, // Продолжает после взаимодействия
        },
    });
});