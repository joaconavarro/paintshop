
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.carousel-container');
    const items = document.querySelector('.carousel-items');
    const productWidth = document.querySelector('.product').offsetWidth;
    const totalProducts = document.querySelectorAll('.product').length;
    
    // Duplicate the carousel items to create a loop effect
    items.innerHTML += items.innerHTML; // Duplicate items
    const itemWidth = productWidth;

    let index = 0;
    const moveCarousel = () => {
        index++;
        if (index >= totalProducts) {
            index = 0; // Reset index to loop
        }
        items.style.transform = `translateX(-${productWidth * index}px)`;
    };

    // Start the carousel movement
    setInterval(moveCarousel, 5000); // Move every 5 seconds
});
