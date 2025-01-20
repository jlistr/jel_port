// ===================================
// IMAGE VIEWER FUNCTIONALITY
// ===================================

// Select necessary elements
const galleryImages = document.querySelectorAll('.gallery-image');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('fullImage');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const photoCredit = document.getElementById('photo-credit');
const creditLink = document.getElementById('credit-link');
const creditText = document.getElementById('credit-text');
const playBtn = document.getElementById('play-btn');
const slideIndicators = document.getElementById('slide-indicators');

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
    updateIndicators();
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

// Update slide indicators
function updateIndicators() {
    slideIndicators.innerHTML = '';
    galleryImages.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add(idx === currentIndex ? 'active' : '');
        dot.addEventListener('click', () => openViewer(idx));
        slideIndicators.appendChild(dot);
    });
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
// AUTOPLAY FUNCTIONALITY
function openViewer(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    modalImg.src = galleryImages[currentIndex].getAttribute('data-full');
    captionText.innerHTML = `${galleryImages[currentIndex].getAttribute('data-model')}<br>${galleryImages[currentIndex].getAttribute('data-photographer')}`;
    updateIndicators();
    startSlideshow();  // Automatically start the slideshow when opened
}

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

galleryImages.forEach((img) => {
    img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        img.style.gridRowEnd = aspectRatio > 1 ? 'span 1' : 'span 3';
    };
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

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission

    const form = e.target;
    const submitButton = form.querySelector(".submit-btn");

    // Validate form fields before submitting
    if (!form.checkValidity()) {
        showToaster("Please fill out all required fields correctly.");
        return;
    }

    // Show loading state and disable button to prevent duplicate submissions
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { Accept: "application/json" },
        });

        if (response.ok) {
            showToaster("Thank you! Your message has been sent.");
            form.reset();
        } else {
            showToaster("Oops! There was a problem. Please try again.");
        }
    } catch (error) {
        showToaster("An error occurred. Please try again.");
        console.error("Form submission error:", error);
    }

    // Reset button text and enable it after processing
    submitButton.textContent = "SEND";
    submitButton.disabled = false;
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