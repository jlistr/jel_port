// Select necessary elements
const galleryImages = document.querySelectorAll('.gallery-image');
const imageViewer = document.getElementById('image-viewer');
const viewerImage = document.getElementById('viewer-image');
const modelInfo = document.getElementById('model-info');
const photographerInfo = document.getElementById('photographer-info');
const imageViewerCloseButton = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const menuToggle = document.querySelector(".Layout_Header-menu-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
const menuCloseButton = document.querySelector(".menu-close");

let currentIndex = null; // Start with null to indicate no image is active

// Open the image viewer
function openViewer(index) {
    if (index < 0 || index >= galleryImages.length || !galleryImages[index]) {
        console.error("Invalid index or image not found:", index);
        return;
    }
    const image = galleryImages[index];
    viewerImage.src = image.src; // Set the image source
    modelInfo.textContent = image.dataset.model || 'Model: Unknown';
    photographerInfo.textContent = image.dataset.photographer || 'Photographer: Unknown';
    imageViewer.style.display = 'flex';
    currentIndex = index;
}

// Close the image viewer
function closeViewer() {
    imageViewer.style.display = 'none';
    currentIndex = null;
}

// Navigate to the next image
function showNext() {
    if (currentIndex === null || galleryImages.length === 0) return;
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openViewer(currentIndex);
}

// Navigate to the previous image
function showPrev() {
    if (currentIndex === null || galleryImages.length === 0) return;
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openViewer(currentIndex);
}

// Add event listeners for gallery images
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openViewer(index));
});

// Add event listeners for navigation buttons
if (imageViewerCloseButton) imageViewerCloseButton.addEventListener('click', closeViewer);
if (prevBtn) prevBtn.addEventListener('click', showPrev);
if (nextBtn) nextBtn.addEventListener('click', showNext);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight' && currentIndex !== null) showNext();
    if (e.key === 'ArrowLeft' && currentIndex !== null) showPrev();
});

// Handle menu toggle and close functionality
if (menuToggle && menuOverlay && menuCloseButton) {
    menuToggle.addEventListener('click', () => menuOverlay.classList.add('open'));
    menuCloseButton.addEventListener('click', () => menuOverlay.classList.remove('open'));

    // Optional: Close menu when clicking outside of it
    menuOverlay.addEventListener('click', (event) => {
        if (event.target === menuOverlay) menuOverlay.classList.remove('open');
    });
}

// Adjust gallery images for Masonry layout
galleryImages.forEach((img) => {
    img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        img.style.gridRowEnd = aspectRatio > 1 ? 'span 1' : 'span 3';
    };
});

// Prevent automatic execution on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded successfully.");
});

// Lazy load adjustment for Book Me button
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

// Contact form submission & Formspree integration
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission

    const form = e.target;
    const submitButton = form.querySelector(".submit-btn");

    // 3. Validate form fields before submitting
    if (!form.checkValidity()) {
        showToaster("Please fill out all required fields correctly.");
        return;
    }

    // 1. Show loading state and 2. Disable button to prevent duplicate submissions
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Collect form data
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            showToaster("Thank you! Your message has been sent."); // Show toaster
            form.reset(); // Reset the form
        } else {
            showToaster("Oops! There was a problem. Please try again.");
        }
    } catch (error) {
        showToaster("An error occurred. Please try again.");
        console.error("Form submission error:", error);
    }

    // Reset button text and enable it after the process is complete
    submitButton.textContent = "SEND";
    submitButton.disabled = false;
});

// Function to show the toaster message
function showToaster(message) {
    const toaster = document.getElementById("toaster");
    toaster.textContent = message;
    toaster.classList.remove("hidden");
    toaster.classList.add("show");

    // Hide the toaster after 3 seconds
    setTimeout(() => {
        toaster.classList.remove("show");
        toaster.classList.add("hidden");
    }, 3000);
}

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
    } else {
        console.error("Error: The form element with ID 'contactForm' was not found in the DOM.");
    }
});