// Move to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    let moveToTopBtn = document.getElementById('move-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            moveToTopBtn.classList.remove('hidden');
            // Add fade-in animation
            moveToTopBtn.style.opacity = '1';
            moveToTopBtn.style.transition = 'opacity 0.3s ease-in-out';
        } else {
            // Add fade-out animation
            moveToTopBtn.style.opacity = '0';
            setTimeout(function() {
                if (document.body.scrollTop <= 300 && document.documentElement.scrollTop <= 300) {
                    moveToTopBtn.classList.add('hidden');
                }
            }, 300);
        }
    });
});

// Smooth scroll to top function
function moveToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Handle smooth scrolling for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return; // Skip if it's just "#"
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const header = document.getElementById('navbar');
                const headerHeight = header ? header.offsetHeight : 0;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20, // Extra padding
                    behavior: 'smooth'
                });
                
                // Update URL without page refresh
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
});