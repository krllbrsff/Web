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
    let entries = JSON.parse(localStorage.getItem('tableEntries')) || [];

    function saveToLocal() {
        localStorage.setItem('tableEntries', JSON.stringify(entries));
    }

    function generateTable() {
        tableBody.innerHTML = '';

        entries.forEach((entry, index) => {
            const row = document.createElement('tr');

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = entry.description;
            row.appendChild(descriptionCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = entry.date;
            row.appendChild(dateCell);

            const mileageCell = document.createElement('td');
            mileageCell.textContent = entry.mileage;
            row.appendChild(mileageCell);

            const costCell = document.createElement('td');
            costCell.textContent = entry.cost;
            row.appendChild(costCell);

            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete-button');
            deleteButton.setAttribute('data-index', index);
            deleteButton.addEventListener('click', deleteEntry);
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

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