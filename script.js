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

// Track the current index in the gallery
let currentIndex = null;

// Function to open the modal with the selected image and show credit
function openViewer(index) {
    if (index < 0 || index >= galleryImages.length || !galleryImages[index]) {
        console.error("Invalid index or image not found:", index);
        return;
    }

    const image = galleryImages[index];
    modal.style.display = 'block';
    modalImg.src = image.getAttribute('data-full'); // Set the full-size image
    captionText.innerHTML = `${image.getAttribute('data-model')}`;

    // Update photographer credit with Instagram link
    const photographerInfo = image.getAttribute('data-photographer');
    const instagramHandle = photographerInfo.match(/\(@(.*?)\)/); // Extract handle from text
    if (instagramHandle) {
        const handle = instagramHandle[1];
        creditText.textContent = photographerInfo;
        creditLink.href = `https://www.instagram.com/${handle}`;
    } else {
        creditText.textContent = photographerInfo;
        creditLink.href = "#";
    }

    // Show the credit section
    photoCredit.style.display = 'flex';
    currentIndex = index;
}

// Function to close the modal
function closeViewer() {
    modal.style.display = 'none';
    photoCredit.style.display = 'none'; // Hide credit when modal closes
    currentIndex = null;
}

// Function to show the next image
function showNext() {
    if (currentIndex === null || galleryImages.length === 0) return;
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openViewer(currentIndex);
}

// Function to show the previous image
function showPrev() {
    if (currentIndex === null || galleryImages.length === 0) return;
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openViewer(currentIndex);
}

// Add event listeners to gallery images for opening modal
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openViewer(index));
});

// Add event listeners for closing and navigation
closeModal.addEventListener('click', closeViewer);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Close modal if user clicks outside of the image
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeViewer();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') closeViewer();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
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