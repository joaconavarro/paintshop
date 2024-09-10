function showAnimation(animationId) {
            const animations = document.querySelectorAll('.animation');
            animations.forEach(animation => {
                if (animation.id === animationId) {
                    animation.classList.add('active');
                } else {
                    animation.classList.remove('active');
                }
            });
        }

        // Set default animation
        showAnimation('animation1');
