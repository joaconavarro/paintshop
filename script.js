function changeBackgroundBasedOnTime() {
    const currentHour = new Date().getHours();  // Get current hour (0-23)

    if (currentHour >= 6 && currentHour < 18) {
        // Daytime (6 AM - 6 PM)
        document.body.style.backgroundColor = 'lightgreen';
    } else {
        // Nighttime (6 PM - 6 AM)
        document.body.style.backgroundColor = 'darkgreen';
    }
}

// Call the function when the page loads
window.onload = changeBackgroundBasedOnTime;
