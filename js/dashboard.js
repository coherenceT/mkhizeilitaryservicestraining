// ============================================
// NATIONAL MILITARY TRAINING PROGRAMME
// Dashboard JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initDashboard();
});

function initDashboard() {
    // Sidebar navigation
    initSidebarNavigation();

    // Tab functionality
    initDashboardTabs();

    // Message functionality
    initMessageActions();

    // Document actions
    initDocumentActions();

    // Event actions
    initEventActions();

    // Progress indicators
    initProgressIndicators();
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================
function initSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const mainContent = document.querySelector('.dashboard-main');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Update main content based on link
            const sectionId = this.getAttribute('href').substring(1);
            updateMainContent(sectionId);
        });
    });
}

function updateMainContent(sectionId) {
    // This would typically load different content based on the section
    // For now, we'll just scroll to the relevant section if it exists
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Update page title based on section
    const titles = {
        'overview': 'Dashboard Overview',
        'application': 'Application Status',
        'documents': 'Document Management',
        'messages': 'Messages',
        'profile': 'Profile Settings'
    };

    const pageTitle = document.querySelector('.dashboard-header h1');
    if (pageTitle && titles[sectionId]) {
        pageTitle.textContent = titles[sectionId];
    }
}

// ============================================
// DASHBOARD TABS
// ============================================
function initDashboardTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabContainer = this.closest('.tabs');
            const targetPanel = this.dataset.tab;

            // Remove active class from all buttons
            tabContainer.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Hide all panels
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

// ============================================
// MESSAGE FUNCTIONALITY
// ============================================
function initMessageActions() {
    const messageItems = document.querySelectorAll('.message-item');

    messageItems.forEach(item => {
        // Mark as read when clicked
        item.addEventListener('click', function() {
            const statusElement = this.querySelector('.message-status');
            if (statusElement && statusElement.textContent === 'Unread') {
                statusElement.textContent = 'Read';
                statusElement.className = 'message-status read';
            }
        });

        // Toggle message expansion
        const messageContent = item.querySelector('.message-content');
        if (messageContent) {
            messageContent.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering parent click
            });
        }
    });
}

// ============================================
// DOCUMENT ACTIONS
// ============================================
function initDocumentActions() {
    const documentButtons = document.querySelectorAll('.document-actions button');

    documentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            const documentItem = this.closest('.document-item');
            const documentTitle = documentItem.querySelector('h4').textContent;

            if (action === 'view') {
                viewDocument(documentTitle);
            } else if (action === 'replace') {
                replaceDocument(documentTitle);
            }
        });
    });
}

function viewDocument(documentTitle) {
    // In a real application, this would open the document in a viewer
    alert(`Viewing ${documentTitle}`);
    console.log(`Viewing document: ${documentTitle}`);
}

function replaceDocument(documentTitle) {
    // In a real application, this would open a file upload dialog
    alert(`Replace ${documentTitle} - Feature coming soon!`);
    console.log(`Replace document: ${documentTitle}`);
}

// ============================================
// EVENT ACTIONS
// ============================================
function initEventActions() {
    const rsvpButtons = document.querySelectorAll('.event-actions button');

    rsvpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventItem = this.closest('.event-item');
            const eventTitle = eventItem.querySelector('h4').textContent;
            const isRSVP = this.textContent === 'RSVP';

            if (isRSVP) {
                rsvpForEvent(eventTitle, this);
            }
        });
    });
}

function rsvpForEvent(eventTitle, button) {
    // In a real application, this would send an RSVP request
    button.textContent = 'RSVP\'d';
    button.classList.add('rsvp-confirmed');
    button.disabled = true;

    // Show confirmation message
    showNotification(`Successfully RSVP'd for ${eventTitle}`, 'success');
}

// ============================================
// PROGRESS INDICATORS
// ============================================
function initProgressIndicators() {
    // Update timeline progress
    updateTimelineProgress();

    // Animate stat counters
    animateDashboardStats();
}

function updateTimelineProgress() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let currentIndex = -1;

    timelineItems.forEach((item, index) => {
        if (item.classList.contains('current')) {
            currentIndex = index;
        }
    });

    // Add progress line styling
    if (currentIndex >= 0) {
        const progressPercentage = ((currentIndex + 1) / timelineItems.length) * 100;
        const timeline = document.querySelector('.timeline');

        if (timeline) {
            timeline.style.setProperty('--progress-percentage', `${progressPercentage}%`);
        }
    }
}

function animateDashboardStats() {
    const statValues = document.querySelectorAll('.dashboard-stat .value');

    statValues.forEach((stat, index) => {
        // Add stagger animation
        stat.style.animationDelay = `${index * 0.2}s`;
        stat.classList.add('animate-stat');
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format dates for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-ZA', options);
}

// Format time for display
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(hours, minutes);
    return time.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
}

// Check if user is logged in (simulated)
function checkAuthentication() {
    // In a real application, this would check for valid session/token
    const userData = localStorage.getItem('user_session');
    return userData !== null;
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user_session');
        window.location.href = '../index.html';
    }
}

// Add event listener for logout
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href="#logout"]')) {
        e.preventDefault();
        handleLogout();
    }
});

// ============================================
// RESPONSIVE BEHAVIOR
// ============================================
function handleResponsiveLayout() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const main = document.querySelector('.dashboard-main');

    function updateLayout() {
        if (window.innerWidth < 1024) {
            // Mobile/tablet layout
            sidebar.style.transform = 'translateX(-100%)';
            main.style.marginLeft = '0';

            // Add toggle button for mobile
            if (!document.querySelector('.sidebar-toggle')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'sidebar-toggle btn btn-small';
                toggleBtn.innerHTML = '☰ Menu';
                toggleBtn.addEventListener('click', toggleSidebar);
                document.querySelector('.dashboard-header').prepend(toggleBtn);
            }
        } else {
            // Desktop layout
            sidebar.style.transform = 'translateX(0)';
            main.style.marginLeft = '260px';

            // Remove mobile toggle
            const toggleBtn = document.querySelector('.sidebar-toggle');
            if (toggleBtn) {
                toggleBtn.remove();
            }
        }
    }

    function toggleSidebar() {
        const isOpen = sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === '';
        sidebar.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0)';
    }

    // Initial layout
    updateLayout();

    // Update on resize
    window.addEventListener('resize', updateLayout);
}

// Initialize responsive behavior
handleResponsiveLayout();

// ============================================
// DATA MANAGEMENT (Simulated)
// ============================================

// Mock data for demonstration
const mockApplicationData = {
    applicationId: 'NMTP-20241201',
    status: 'Under Review',
    submittedDate: '2024-12-01',
    lastUpdated: '2024-12-10',
    progress: 60
};

// Update dashboard with real data (in production, this would come from API)
function updateDashboardData() {
    // Update application ID
    const appIdElements = document.querySelectorAll('.dashboard-stat .value');
    appIdElements.forEach(element => {
        if (element.textContent.includes('NMTP-')) {
            element.textContent = mockApplicationData.applicationId;
        }
    });

    // Update status
    const statusElements = document.querySelectorAll('.dashboard-stat .value');
    statusElements.forEach(element => {
        if (['Under Review', 'Approved', 'Pending', 'Rejected'].includes(element.textContent)) {
            element.textContent = mockApplicationData.status;
        }
    });
}

// Initialize data updates
updateDashboardData();

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================
function initAccessibility() {
    // Add keyboard navigation for sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Improve focus management
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--teal)';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
}

initAccessibility();
