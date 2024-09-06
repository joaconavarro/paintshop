let currentIndex = 0;
const carouselItems = document.querySelector('.carousel-items');
const products = document.querySelectorAll('.product');
const totalItems = products.length;
const visibleItems = 5;
const rotationTime = 5000; // 5 seconds
const transitionTime = 5000; // Match with CSS transition duration

// Clone the first set of items to create a seamless loop effect
const carouselContainer = document.querySelector('.carousel-container');
const clone = document.querySelector('.carousel-items').cloneNode(true);
carouselContainer.appendChild(clone);

function rotateCarousel() {
    currentIndex = (currentIndex + 1) % totalItems;

    // Calculate the translateX value to show the next set of products
    const translateXValue = -currentIndex * (products[0].offsetWidth + 20); // 20px for margin
    carouselItems.style.transform = `translateX(${translateXValue}px)`;
}

// Run the rotation every 5 seconds
setInterval(rotateCarousel, rotationTime);

// Ensure the carousel starts with the proper position
function setInitialPosition() {
    carouselItems.style.transition = 'none'; // Disable transition for initial position
    carouselItems.style.transform = `translateX(${0}px)`;
    setTimeout(() => {
        carouselItems.style.transition = `transform ${transitionTime}ms ease`;
    }, 50); // Small delay to ensure transition is re-enabled
}

window.onload = setInitialPosition;
