
document.addEventListener("DOMContentLoaded", function() {
    const cajas = document.querySelectorAll('.caja');
    
    // Function to restart animations
    function restartAnimations() {
        // Remove the fade-out class to start the animation
        cajas.forEach(caja => {
            caja.classList.remove('fade-out');
        });
        
        // Force reflow to restart the animations
        void document.body.offsetWidth;
        
        // Add the fade-out class after a brief moment to create a delay
        setTimeout(() => {
            cajas.forEach(caja => {
                caja.classList.add('fade-out');
            });
        }, 0); // You can adjust this if needed

        // Remove fade-out class to restart animations after the delay
        setTimeout(() => {
            cajas.forEach(caja => {
                caja.classList.remove('fade-out');
            });
        }, 10000); // Delay before restarting animations (adjust as needed)
    }

    // Apply the fade-out effect and restart animations after 10 seconds
    setTimeout(() => {
        cajas.forEach(caja => {
            caja.classList.add('fade-out');
        });
        
        // Restart animations after 10 seconds + delay
        setTimeout(restartAnimations, 10000); // Total delay before restarting the loop
    }, 10000); // Initial delay before the first fade-out
});
