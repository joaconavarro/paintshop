document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.carousel-container');
    const items = document.querySelector('.carousel-items');
    const products = document.querySelectorAll('.product');
    const productWidth = products[0].offsetWidth; // Get the width of one product
    const totalProducts = products.length;

    // Duplicate the carousel items to create a loop effect
    items.innerHTML += items.innerHTML; // Duplicate items

    // Set the initial width of the carousel-items
    items.style.width = `${productWidth * totalProducts * 2}px`; // 2 times the width of the items for smooth scrolling

    let index = 0;
    const moveCarousel = () => {
        index++;
        if (index >= totalProducts) {
            // Reset index and immediately move to the start without animation
            items.style.transition = 'none';
            items.style.transform = `translateX(0)`;
            index = 0;
            // Trigger reflow to enable the transition
            items.offsetHeight; // Trigger reflow
            // Restore transition
            items.style.transition = 'transform 0.5s ease';
        }
        items.style.transform = `translateX(-${productWidth * (index + totalProducts)}px)`;
    };

    // Start the carousel movement
    setInterval(moveCarousel, 5000); // Move every 5 seconds

    // Optional: Handle window resize events to adjust carousel width
    window.addEventListener('resize', () => {
        // Recalculate widths if needed
        // This might not be necessary unless the carousel is responsive
    });
});
