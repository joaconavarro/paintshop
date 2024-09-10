document.addEventListener('DOMContentLoaded', () => {
    const animatedImage = document.getElementById('animated-image');
    const body = document.getElementById('body');
    const login = document.getElementById('login')

    function animateImage() {
        // Initially hide the image
        animatedImage.style.opacity = '0';

        // Start the flying, spinning, zooming, and fading animation
        animatedImage.style.animation = 'flyInZoomOut 8s ease-out forwards';
        
        // Ensure the image is correctly positioned during animation
        setTimeout(() => {
            body.style.backgroundColor = 'rgb(241 219 192 / 44%)';
            login.style.backgroundColor = 'white';
            animatedImage.style.top = 'calc(50% - 25px)'; // Center vertically next to the button
            animatedImage.style.right = 'calc(100% + 20px)'; // Position to the right of the button
        }, 7000); // Match the duration of the animation

        
    }

    animateImage();
});

