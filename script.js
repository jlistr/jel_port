// ===================================
// IMAGE VIEWER FUNCTIONALITY
// ===================================

document.addEventListener("DOMContentLoaded", function () {
    // Check if elements exist to avoid errors on pages without the modal
    const galleryImages = document.querySelectorAll('.gallery-image');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playBtn = document.getElementById('play-btn');

    // Only execute the code if modal elements are found
    if (modal && closeModal && prevBtn && nextBtn && playBtn) {
        let currentIndex = 0;
        let slideshowInterval;
        let isPlaying = false;

        // Open the modal with the clicked image
        function openViewer(index) {
            currentIndex = index;
            const image = galleryImages[currentIndex];
            modal.style.display = 'flex';
            modalImg.src = image.getAttribute('data-full');
            captionText.innerHTML = `${image.getAttribute('data-model')}<br>${image.getAttribute('data-photographer')}`;
            
            
        }

        // Close the modal
        function closeViewer() {
            modal.style.display = 'none';
            stopSlideshow();
        }

        // Show next image
        function showNext() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            openViewer(currentIndex);
        }

        // Show previous image
        function showPrev() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            openViewer(currentIndex);
        }


        // Start slideshow
        function startSlideshow() {
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
            slideshowInterval = setInterval(showNext, 3000);
        }

        // Stop slideshow
        function stopSlideshow() {
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
            clearInterval(slideshowInterval);
        }

        // Toggle slideshow play/pause
        function toggleSlideshow() {
            if (isPlaying) {
                stopSlideshow();
            } else {
                startSlideshow();
            }
        }

        // Event listeners for image click
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => openViewer(index));
        });

        // Close modal when clicking the close button
        closeModal.addEventListener('click', closeViewer);

        // Navigate through images
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        // Play/Pause slideshow
        playBtn.addEventListener('click', toggleSlideshow);

        // Close modal when clicking outside the image
        window.addEventListener('click', (event) => {
            if (event.target === modal) closeViewer();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'Escape') closeViewer();
                if (e.key === 'ArrowRight') showNext();
                if (e.key === 'ArrowLeft') showPrev();
            }
        });

        // TOUCH GESTURE FUNCTIONALITY
        let touchStartX = 0;
        modal.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        modal.addEventListener('touchend', (e) => {
            let touchEndX = e.changedTouches[0].clientX;
            if (touchEndX < touchStartX) showNext();
            if (touchEndX > touchStartX) showPrev();
        });
    } else {
        console.log("Image viewer elements not found on this page.");
    }
});

// ===================================
// MOBILE NAVIGATION MENU
// ===================================

const menuToggle = document.querySelector(".Layout_Header-menu-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
const menuCloseButton = document.querySelector(".menu-close");

if (menuToggle && menuOverlay && menuCloseButton) {
    menuToggle.addEventListener('click', () => menuOverlay.classList.add('open'));
    menuCloseButton.addEventListener('click', () => menuOverlay.classList.remove('open'));

    // Optional: Close menu when clicking outside of it
    menuOverlay.addEventListener('click', (event) => {
        if (event.target === menuOverlay) menuOverlay.classList.remove('open');
    });
}

// ===================================
// MASONRY GALLERY LAYOUT
// ===================================

document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll('.gallery-image');

    if (galleryImages.length > 0) {
        galleryImages.forEach((img) => {
            img.onload = () => {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                img.style.gridRowEnd = aspectRatio > 1 ? 'span 1' : 'span 3';
            };
        });
    } else {
        console.warn("No gallery images found on this page.");
    }
});

// ===================================
// LAZY LOAD "BOOK ME" BUTTON
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const bookMeButton = document.querySelector('.book-me-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            bookMeButton.style.opacity = '1';
            bookMeButton.style.pointerEvents = 'auto';
        } else {
            bookMeButton.style.opacity = '0.5';
            bookMeButton.style.pointerEvents = 'none';
        }
    });
});

// ===================================
// FORM SUBMISSION HANDLING
// ===================================

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Prevent default submission

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.ok) {
                    showToaster("Thank you! Your message has been sent."); 
                    contactForm.reset();
                } else {
                    showToaster("Oops! There was a problem. Please try again.");
                }
            } catch (error) {
                showToaster("An error occurred. Please try again.");
                console.error("Form submission error:", error);
            }
        });
    }
});

// Show toaster messages
function showToaster(message) {
    const toaster = document.getElementById("toaster");
    toaster.textContent = message;
    toaster.classList.remove("hidden");
    toaster.classList.add("show");

    // Hide toaster after 3 seconds
    setTimeout(() => {
        toaster.classList.remove("show");
        toaster.classList.add("hidden");
    }, 3000);
}

// Prevent automatic execution on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded successfully.");
});