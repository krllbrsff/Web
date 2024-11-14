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
    const tableContainer = document.getElementById('table-container');

    function loadTable() {
        const savedEntries = JSON.parse(localStorage.getItem('tableEntries')) || [];
        generateTable(savedEntries);
    }

    function generateTable(entries) {
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('table-grid');

        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Описание</th><th>Дата</th><th>Пробег</th><th>Стоимость</th><th></th></tr>`;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        entries.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.description}</td>
                <td>${entry.date}</td>
                <td>${entry.mileage}</td>
                <td>${entry.cost}</td>
                <td><button class="delete-button" data-index="${index}">Удалить</button></td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        tableContainer.appendChild(table);

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', deleteEntry);
        });
    }

    function deleteEntry(event) {
        const index = event.target.getAttribute('data-index');
        const entries = JSON.parse(localStorage.getItem('tableEntries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('tableEntries', JSON.stringify(entries));
        generateTable(entries);
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const entry = {
            description: formData.get('description'),
            date: formData.get('date'),
            mileage: formData.get('mileage'),
            cost: formData.get('cost')
        };

        const entries = JSON.parse(localStorage.getItem('tableEntries')) || [];
        entries.push(entry);
        localStorage.setItem('tableEntries', JSON.stringify(entries));

        generateTable(entries);
        form.reset();
    });

    loadTable();
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