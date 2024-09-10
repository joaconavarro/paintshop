    function showAnimation(animationId) {
        const animations = document.querySelectorAll('.animation');
        animations.forEach(animation => {
            if (animation.id === animationId) {
                animation.classList.add('active');
                if (animationId === 'animation2') {
                    document.querySelector('.caja-1').classList.add('animate-caja-1');
                }
            } else {
                animation.classList.remove('active');
                if (animation.id === 'animation2') {
                    document.querySelector('.caja-1').classList.remove('animate-caja-1');
                }
            }
        });
    }

    // Set default animation
    showAnimation('animation1');
