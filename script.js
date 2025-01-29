// Navigation hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');

function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add toast to body
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    submitBtn.classList.add('loading');

    // Get form data
    const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value,
        to_email: 'arun19krishnan96@gmail.com' // Replace with your email
    };

    // Send email using EmailJS
    emailjs.send('default_service', 'template_id', formData) // Replace with your service and template IDs
        .then(function() {
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
        })
        .catch(function(error) {
            showToast('Failed to send message. Please try again.', 'error');
            console.error('EmailJS Error:', error);
        })
        .finally(function() {
            submitBtn.classList.remove('loading');
        });
});

// Animate skill bars on scroll
const skillCards = document.querySelectorAll('.skill-card');
const animateSkills = () => {
    skillCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.querySelector('.progress').style.width = card.querySelector('.progress').getAttribute('style').split(':')[1];
        }
    });
};

window.addEventListener('scroll', animateSkills);

// Add animation class to elements when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
