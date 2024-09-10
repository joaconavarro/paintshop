// main.js
document.addEventListener('DOMContentLoaded', () => {
    const adminButton = document.getElementById('admin-panel-button');

    adminButton.addEventListener('click', () => {
        window.location.href = '/admin/login.html';  // Redirects to the admin page
    });
});