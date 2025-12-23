// ========== PROJECTS CAROUSEL ==========
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    const cards = document.querySelectorAll('.project-card');

    if (!track || !leftArrow || !rightArrow || cards.length === 0) return;

    let currentIndex = 2; // Start with middle card (featured) centered
    const cardWidth = cards[0].offsetWidth;
    const gap = 15;

    function updateCarousel() {
        const offset = -(currentIndex * (cardWidth + gap)) + (track.parentElement.offsetWidth / 2) - (cardWidth / 2);
        track.style.transform = `translateX(${offset}px)`;

        // Update featured class
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('project-featured');
            } else {
                card.classList.remove('project-featured');
            }
        });
    }

    leftArrow.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', function() {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initialize carousel position
    updateCarousel();

    // Update on window resize
    window.addEventListener('resize', updateCarousel);
});

// ========== PARTNERS CAROUSEL ==========
document.addEventListener('DOMContentLoaded', function() {
    const partnersTrack = document.querySelector('.partners-track');
    const leftArrow = document.querySelector('.partners-arrow-left');
    const rightArrow = document.querySelector('.partners-arrow-right');
    const partnerLogos = document.querySelectorAll('.partner-logo');

    if (!partnersTrack || !leftArrow || !rightArrow || partnerLogos.length === 0) return;

    let currentIndex = 0;
    const gap = 60;
    let autoScrollInterval;

    function getVisibleLogos() {
        // Responsive: adjust visible logos based on screen width
        if (window.innerWidth <= 768) {
            return 3; // Show 3 logos on mobile
        } else if (window.innerWidth <= 992) {
            return 4; // Show 4 logos on tablets
        }
        return 5; // Show 5 logos on desktop
    }

    function getLogoWidth() {
        return partnerLogos[0].offsetWidth;
    }

    function getMoveDistance() {
        return getLogoWidth() + gap;
    }

    function getMaxIndex() {
        return Math.max(0, partnerLogos.length - getVisibleLogos());
    }

    function updatePartnersCarousel() {
        const moveDistance = getMoveDistance();
        const offset = -(currentIndex * moveDistance);
        partnersTrack.style.transform = `translateX(${offset}px)`;
        updateCenterLogo();
    }

    function updateCenterLogo() {
        // Calculate the center logo based on visible logos
        const visibleLogos = getVisibleLogos();
        const centerIndex = currentIndex + Math.floor(visibleLogos / 2);

        // Remove center-logo class from all logos
        partnerLogos.forEach(logo => logo.classList.remove('center-logo'));

        // Add center-logo class to the center logo
        if (partnerLogos[centerIndex]) {
            partnerLogos[centerIndex].classList.add('center-logo');
        }
    }

    function scrollLeft() {
        if (currentIndex > 0) {
            currentIndex--;
            updatePartnersCarousel();
        }
    }

    function scrollRight() {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updatePartnersCarousel();
        }
    }

    // Auto-scroll function
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const maxIndex = getMaxIndex();

            // Check if we've reached the end
            if (currentIndex >= maxIndex) {
                // Reset to beginning
                currentIndex = 0;
            } else {
                // Move to next
                currentIndex++;
            }

            updatePartnersCarousel();
        }, 3000); // Auto-scroll every 3 seconds
    }

    // Stop auto-scroll when user interacts
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Restart auto-scroll after user interaction
    function restartAutoScroll() {
        stopAutoScroll();
        setTimeout(() => {
            startAutoScroll();
        }, 5000); // Wait 5 seconds after interaction before restarting auto-scroll
    }

    // Arrow click events
    leftArrow.addEventListener('click', function() {
        stopAutoScroll();
        scrollLeft();
        restartAutoScroll();
    });

    rightArrow.addEventListener('click', function() {
        stopAutoScroll();
        scrollRight();
        restartAutoScroll();
    });

    // Pause auto-scroll on hover
    partnersTrack.addEventListener('mouseenter', stopAutoScroll);
    partnersTrack.addEventListener('mouseleave', startAutoScroll);

    // Initialize
    updatePartnersCarousel();
    startAutoScroll();

    // Update on window resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updatePartnersCarousel();
    });
});
