document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const featuredProducts = document.getElementById('featured-products');
    const mainSection = document.getElementById('main-section');
    const contentDivs = mainSection.querySelectorAll('.content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const linkId = this.id;

            if (linkId === 'inicio') {
                // Redirect to index.html
                window.location.href = '/paintshop/index.html';
            } else {
                // Hide the featured products section
                featuredProducts.style.display = 'none';

                // Hide all content divs
                contentDivs.forEach(div => {
                    div.style.display = 'none';
                });

                // Show the corresponding content div
                const contentToShow = document.getElementById(`${linkId}-content`);
                if (contentToShow) {
                    contentToShow.style.display = 'block';
                }
            }
        });
    });
});
