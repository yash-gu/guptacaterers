// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle menu
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        links.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .gallery-item, .feature, .info-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// QR Code Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const instagramBtn = document.getElementById('instagramBtn');
    const qrCode = document.querySelector('.instagram-qr .qr-code');
    let isVisible = false;

    // Toggle QR code visibility
    function toggleQR(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isVisible) {
            // Hide any other open QR codes
            document.querySelectorAll('.qr-code.visible').forEach(qr => {
                if (qr !== qrCode) {
                    qr.classList.remove('visible');
                }
            });
            
            // Show this QR code
            qrCode.classList.add('visible');
            isVisible = true;
            
            // Add click outside listener
            document.addEventListener('click', closeOnClickOutside);
        } else {
            hideQR();
        }
    }
    
    // Hide QR code
    function hideQR() {
        if (qrCode) {
            qrCode.classList.remove('visible');
            isVisible = false;
            document.removeEventListener('click', closeOnClickOutside);
        }
    }
    
    // Close QR when clicking outside
    function closeOnClickOutside(e) {
        if (!e.target.closest('.instagram-qr')) {
            hideQR();
        }
    }
    
    // Toggle QR on Instagram icon click
    if (instagramBtn && qrCode) {
        instagramBtn.addEventListener('click', toggleQR);
    }
    
    // Close QR when clicking the close button
    const closeBtn = qrCode ? qrCode.querySelector('.close-btn') : null;
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            hideQR();
        });
    }
    
    // Close QR with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isVisible) {
            hideQR();
        }
    });
});

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .gallery-item, .feature, .info-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation for gallery items on hover
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.03)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});
