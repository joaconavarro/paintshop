document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('login-section');
    const adminPanel = document.getElementById('admin-panel');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    const correctUsername = 'admin';
    const correctPassword = 'Rohanello23'; // Replace with your own credentials

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === correctUsername && password === correctPassword) {
            loginSection.style.display = 'none';
            adminPanel.style.display = 'block'; // Show admin panel on successful login
        } else {
            loginError.style.display = 'block';
        }
    });
});
