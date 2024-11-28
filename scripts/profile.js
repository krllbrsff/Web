document.addEventListener('DOMContentLoaded', async () => {
    const preloader = document.getElementById('preloader');
    const profileData = document.getElementById('profile-data');
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Ошибка сети');
        }

        const users = await response.json();
        const user = users[Math.floor(Math.random() * users.length)];

        document.getElementById('username').textContent = user.username;
        document.getElementById('name').textContent = user.name;
        document.getElementById('email').textContent = user.email;
        document.getElementById('address').textContent = `${user.address.street}, ${user.address.city}`;
        document.getElementById('phone').textContent = user.phone;
        document.getElementById('website').textContent = user.website;
        document.getElementById('company').textContent = user.company.name;

        preloader.style.display = 'none';
        profileData.style.display = 'block';
    } catch (error) {
        console.error(error);
        preloader.style.display = 'none';
        errorMessage.style.display = 'block';
    }
});
