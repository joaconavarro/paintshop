let currentIndex = 0;
const carouselItems = document.querySelector('.carousel-items');
const products = document.querySelectorAll('.product');
const totalItems = products.length;
const visibleItems = 5;
const rotationTime = 5000; // 5 seconds
const transitionTime = 5000; // Match with CSS transition duration

// Clone the first set of items to create a seamless loop effect
const clone = carouselItems.cloneNode(true);
document.querySelector('.carousel-container').appendChild(clone);

// Adjust the width of the carousel-items container
function adjustCarouselWidth() {
    const productWidth = products[0].offsetWidth + 20; // Width including margins
    const totalWidth = productWidth * totalItems;
    carouselItems.style.width = `${totalWidth}px`;
    document.querySelector('.carousel-container .carousel-items:last-child').style.width = `${totalWidth}px`;
}

// Move to the next set of products
function rotateCarousel() {
    currentIndex = (currentIndex + 1) % totalItems;

    // Calculate the translateX value to show the next set of products
    const productWidth = products[0].offsetWidth + 20; // Width including margins
    const translateXValue = -currentIndex * productWidth; 
    carouselItems.style.transform = `translateX(${translateXValue}px)`;

    // Reset position after completing one full rotation
    if (currentIndex === 0) {
        setTimeout(() => {
            carouselItems.style.transition = 'none'; // Disable transition
            carouselItems.style.transform = `translateX(0px)`; // Reset to the start
            setTimeout(() => {
                carouselItems.style.transition = `transform ${transitionTime}ms ease`; // Re-enable transition
            }, 50); // Small delay to ensure transition is re-enabled
        }, rotationTime - 50); // Wait until the rotation time is almost over
    }
}

// Initialize carousel width and start rotation
window.onload = () => {
    adjustCarouselWidth();
    rotateCarousel();
    setInterval(rotateCarousel, rotationTime);
};
