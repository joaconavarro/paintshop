document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.carousel-container');
    const items = document.querySelector('.carousel-items');
    const products = Array.from(document.querySelectorAll('.product'));
    const productWidth = products[0].offsetWidth; // Width of one product
    const totalProducts = products.length;
    
    // Duplicate the carousel items to create a loop effect
    items.innerHTML += items.innerHTML; // Duplicate items
    const totalWidth = productWidth * totalProducts * 2; // Twice the width to allow smooth scrolling

    items.style.width = `${totalWidth}px`; // Set the width of the items container to fit all items

    let index = 0;
    const moveCarousel = () => {
        if (index >= totalProducts) {
            // Reset position without animation when we reach the end of the first set
            items.style.transition = 'none';
            items.style.transform = `translateX(0)`;
            index = 0;
            // Trigger reflow to ensure the transition is applied
            items.offsetHeight; // Trigger reflow
            // Restore transition
            items.style.transition = 'transform 0.5s ease';
        }
        items.style.transform = `translateX(-${productWidth * (index + totalProducts)}px)`;
        index++;
    };

    // Start the carousel movement
    setInterval(moveCarousel, 5000); // Move every 5 seconds

    // Optional: Handle window resize events to adjust carousel width
    window.addEventListener('resize', () => {
        // Recalculate product width
        const newProductWidth = products[0].offsetWidth;
        items.style.width = `${newProductWidth * totalProducts * 2}px`;
    });
});
