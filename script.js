function applyDayOrNightMode() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 18) {
        // Daytime: use default variables
        document.documentElement.classList.remove('darkmode');
    } else {
        // Nighttime: apply dark mode variables
        document.documentElement.classList.add('darkmode');
    }
}

// Apply the appropriate mode when the page loads
window.onload = applyDayOrNightMode;
