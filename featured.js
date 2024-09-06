let currentIndex = 0;
const carouselItems = document.querySelector('.carousel-items');
const products = document.querySelectorAll('.product');
const totalItems = products.length;
const visibleItems = 5;
const rotationTime = 3000; // 3 seconds

function rotateCarousel() {
    // Increment index and reset if it exceeds totalItems - visibleItems
    currentIndex = (currentIndex + 1) % (totalItems - visibleItems + 1);
    
    // Move the carousel by translating it to show the next set of products
    const translateXValue = -currentIndex * (products[0].offsetWidth + 20); // 20px for margin
    carouselItems.style.transform = `translateX(${translateXValue}px)`;
}

// Run the rotation every 3 seconds
setInterval(rotateCarousel, rotationTime);
