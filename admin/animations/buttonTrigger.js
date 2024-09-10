    // Function to show the correct animation and trigger the animation for specific containers
    function showAnimation(animationId) {
        const animations = document.querySelectorAll('.animation');
        
        animations.forEach(animation => {
            if (animation.id === animationId) {
                animation.classList.add('active');
                
                // Add animation class to the caja-1 element if it exists
                const cajaElement = animation.querySelector('.caja-1');
                if (cajaElement) {
                    cajaElement.classList.add('animate-caja-1');
                }
            } else {
                animation.classList.remove('active');
                
                // Remove animation class from the caja-1 element if it exists
                const cajaElement = animation.querySelector('.caja-1');
                if (cajaElement) {
                    cajaElement.classList.remove('animate-caja-1');
                }
            }
        });
    }

    // Event listener for button clicks
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            const animationId = event.target.getAttribute('data-animation');
            showAnimation(animationId);
        });
    });

    // Set default animation if needed (for example, animation1)
    showAnimation('animation1');
