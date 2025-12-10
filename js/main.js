// ============================================
// NATIONAL MILITARY TRAINING PROGRAMME
// Main JavaScript File
// ============================================

console.log('JavaScript file loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    // Initialize all components
    initMobileMenu();
    initTestimonialSlider();
    initScrollEffects();
    initFormValidation();
    initSmoothScrolling();
    initStatsAnimation();
    initLogoClickCounter();
});

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    console.log('Mobile menu init:', { mobileMenuToggle, navLinks });

    if (mobileMenuToggle && navLinks) {
        console.log('Mobile menu elements found, adding event listener');

        // Use a click handler that prevents propagation so document-level click doesn't immediately close the menu.
        mobileMenuToggle.addEventListener('click', function(event) {
            console.log('Mobile menu toggle clicked');
            event.preventDefault();
            event.stopPropagation(); // prevent the document click handler from running for this event
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            console.log('Menu classes:', navLinks.className, mobileMenuToggle.className);
        });

        // Close mobile menu when clicking on a link; stop propagation so document handler doesn't interfere.
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Nav link clicked, closing menu');
                e.stopPropagation();
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside, but only when the menu is open.
        document.addEventListener('click', function(event) {
            // Only attempt to close if menu is currently active/open
            if (!navLinks.classList.contains('active')) return;

            if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                console.log('Clicked outside while menu open, closing menu');
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    } else {
        console.log('Mobile menu elements not found');
    }
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (testimonials.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current testimonial
        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Initialize
    showSlide(0);
    startAutoSlide();
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    const nav = document.getElementById('main-nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class to nav
        if (scrollTop > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink(scrollTop);

        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.programme-card, .value-item, .stat-item, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// ACTIVE NAV LINK UPDATE
// ============================================
function updateActiveNavLink(scrollTop) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(form)) {
                // Simulate form submission
                showSuccessMessage(form);
            }
        });

        // Real-time validation
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;

    // Remove existing error messages
    removeFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${fieldName} is required`);
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    }

    // ID number validation (South African)
    if (field.name === 'idNumber' && value) {
        if (!validateSouthAfricanID(value)) {
            showFieldError(field, 'Please enter a valid South African ID number');
            isValid = false;
        }
    }

    // Update field styling
    field.classList.toggle('error', !isValid);

    return isValid;
}

function validateSouthAfricanID(idNumber) {
    // Basic South African ID validation
    if (idNumber.length !== 13 || !/^\d+$/.test(idNumber)) {
        return false;
    }

    // Luhn algorithm check
    let sum = 0;
    for (let i = 0; i < 13; i++) {
        let digit = parseInt(idNumber[i]);
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }

    return sum % 10 === 0;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
    field.classList.add('error');
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success';
    successMessage.innerHTML = `
        <div class="alert-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
            </svg>
        </div>
        <div class="alert-content">
            <h4>Application Submitted Successfully!</h4>
            <p>Your application has been received and is being processed. You will receive a confirmation email shortly.</p>
        </div>
    `;

    form.parentNode.insertBefore(successMessage, form);
    form.style.display = 'none';

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animate number counters
function animateCounter(element, target, duration = 2000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialize counter animations when stats come into view
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stats-section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// STATS ANIMATION
// ============================================
function initStatsAnimation() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate main stats
                const mainStats = entry.target.querySelectorAll('.stat-number');
                mainStats.forEach((stat, index) => {
                    setTimeout(() => {
                        animateStatNumber(stat);
                    }, index * 200);
                });

                // Animate extra stats
                const extraStats = entry.target.querySelectorAll('.extra-number');
                extraStats.forEach((stat, index) => {
                    setTimeout(() => {
                        animateStatNumber(stat);
                    }, (mainStats.length * 200) + (index * 150));
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stats sections
    document.querySelectorAll('.stats-section').forEach(section => {
        observer.observe(section);
    });
}

function animateStatNumber(element) {
    const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent.replace(/[^\d]/g, ''));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    element.style.transition = 'color 0.3s ease';
    element.style.color = 'var(--teal-light)';

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            element.style.color = 'var(--teal-light)';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 16);
}

// ============================================
// INITIALIZE COUNTERS
// ============================================
initCounters();

// ============================================
// LOADING STATES
// ============================================
function showLoading(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;

    return function reset() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeModal(event.target.id);
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});

// ============================================
// PROGRESS BAR FUNCTIONALITY
// ============================================
function updateProgressBar(progressBar, percentage) {
    const fill = progressBar.querySelector('.progress-fill');
    if (fill) {
        fill.style.width = percentage + '%';
    }
}

// ============================================
// ACCORDION FUNCTIONALITY
// ============================================
function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentNode;
            const isActive = item.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });

            // Open clicked accordion if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

initAccordions();

// ============================================
// TABS FUNCTIONALITY
// ============================================
function initTabs() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabList = this.parentNode;
            const targetPanel = this.dataset.tab;

            // Remove active class from all tabs
            tabList.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab panels
            const tabContainer = tabList.parentNode;
            tabContainer.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });

            // Show target panel
            const targetPanelElement = tabContainer.querySelector(`#${targetPanel}`);
            if (targetPanelElement) {
                targetPanelElement.classList.add('active');
            }
        });
    });
}

initTabs();

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ============================================
// RESPONSIVE UTILITIES
// ============================================
function isMobile() {
    return window.innerWidth < 768;
}

function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

function isDesktop() {
    return window.innerWidth >= 1024;
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Handle scroll effects
                initScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Use passive listeners where appropriate
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
}

optimizePerformance();

// ============================================
// LOGO CLICK COUNTER FOR ADMIN ACCESS
// ============================================
function initLogoClickCounter() {
    const logo = document.querySelector('.logo');
    if (!logo) return;

    let clickCount = 0;
    let clickTimer = null;
    const maxClicks = 3;
    const timeWindow = 2000; // 2 seconds

    logo.addEventListener('click', function(event) {
        // Only count clicks on the logo itself, not on links within it
        if (event.target.tagName === 'A' || event.target.closest('a')) {
            return; // Don't interfere with normal navigation
        }

        clickCount++;

        // Clear existing timer
        if (clickTimer) {
            clearTimeout(clickTimer);
        }

        // Set new timer
        clickTimer = setTimeout(() => {
            clickCount = 0; // Reset counter if time window expires
        }, timeWindow);

        // Check if we've reached the required number of clicks
        if (clickCount >= maxClicks) {
            // Redirect to admin dashboard
            window.location.href = 'admin/';
            clickCount = 0; // Reset counter
            clearTimeout(clickTimer);
        }

        // Provide visual feedback for debugging (optional)
        console.log(`Logo clicks: ${clickCount}/${maxClicks}`);
    });

    // Add a subtle visual indicator when hovering (optional)
    logo.addEventListener('mouseenter', function() {
        if (clickCount > 0) {
            this.style.cursor = 'pointer';
            this.style.opacity = '0.8';
        }
    });

    logo.addEventListener('mouseleave', function() {
        this.style.opacity = '';
    });
}

// ============================================
// MOBILE MENU TOGGLE FUNCTION (DIRECT STYLE MANIPULATION)
// ============================================
function toggleMobileMenu() {
    console.log('toggleMobileMenu called');

    // Get elements directly
    const navLinks = document.getElementById('nav-links');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

    console.log('Elements found:', { navLinks, mobileMenuToggle });

    if (!navLinks || !mobileMenuToggle) {
        console.error('Mobile menu elements not found!');
        return;
    }

    // Check if menu is currently open by checking inline styles
    const isCurrentlyOpen = navLinks.style.visibility === 'visible' ||
                           navLinks.classList.contains('active');

    console.log('Menu currently open?', isCurrentlyOpen);

    if (isCurrentlyOpen) {
        // CLOSE MENU - hide it completely
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');

        // Force hide with inline styles
        navLinks.style.position = 'fixed';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.transform = 'translateY(-120%)';
        navLinks.style.opacity = '0';
        navLinks.style.visibility = 'hidden';
        navLinks.style.zIndex = '-1'; // Hide behind everything
        navLinks.style.background = 'transparent';

        console.log('Menu FORCE CLOSED');
    } else {
        // OPEN MENU - show it prominently
        navLinks.classList.add('active');
        mobileMenuToggle.classList.add('active');

        // Force show with inline styles - make it impossible to miss
        navLinks.style.position = 'fixed';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.bottom = '0';
        navLinks.style.transform = 'translateY(0)';
        navLinks.style.opacity = '1';
        navLinks.style.visibility = 'visible';
        navLinks.style.zIndex = '999999';
        navLinks.style.background = 'white';
        navLinks.style.border = '5px solid red';
        navLinks.style.boxShadow = '0 0 0 10px blue';
        navLinks.style.padding = '30px';
        navLinks.style.display = 'block';

        console.log('Menu FORCE OPENED with bright borders');
    }
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================
function initAccessibility() {
    // Add focus management for modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        });
    });

    // Improve screen reader support
    document.querySelectorAll('.slider-btn').forEach(btn => {
        btn.setAttribute('aria-label', btn.classList.contains('prev-btn') ? 'Previous testimonial' : 'Next testimonial');
    });
}

initAccessibility();
