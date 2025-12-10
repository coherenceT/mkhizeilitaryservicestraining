// ============================================
// NATIONAL MILITARY TRAINING PROGRAMME
// Admin Dashboard JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin dashboard components
    initAdminDashboard();
});

function initAdminDashboard() {
    // Sidebar navigation
    initAdminSidebarNavigation();

    // Initialize charts and analytics
    initCharts();

    // Table functionality
    initDataTables();

    // Action buttons
    initActionButtons();

    // Filters and search
    initFilters();

    // Modal functionality
    initModals();
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================
function initAdminSidebarNavigation() {
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
            updateAdminMainContent(sectionId);
        });
    });
}

function updateAdminMainContent(sectionId) {
    // This would typically load different content based on the section
    // For now, we'll just scroll to the relevant section if it exists
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Update page title based on section
    const titles = {
        'overview': 'Admin Dashboard Overview',
        'applications': 'Application Management',
        'analytics': 'Analytics & Reports',
        'messages': 'Message Center',
        'reports': 'Reports & Exports',
        'settings': 'System Settings'
    };

    const pageTitle = document.querySelector('.dashboard-header h1');
    if (pageTitle && titles[sectionId]) {
        pageTitle.textContent = titles[sectionId];
    }
}

// ============================================
// CHARTS AND ANALYTICS
// ============================================
function initCharts() {
    // Initialize Chart.js if available
    if (typeof Chart !== 'undefined') {
        initApplicationChart();
    } else {
        // Fallback for when Chart.js is not loaded
        createMockCharts();
    }
}

function initApplicationChart() {
    const ctx = document.getElementById('applicationChart');
    if (!ctx) return;

    const applicationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Approved',
                data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48],
                borderColor: '#1f838a',
                backgroundColor: 'rgba(31, 131, 138, 0.1)',
                tension: 0.4
            }, {
                label: 'Pending',
                data: [8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35],
                borderColor: '#d4a017',
                backgroundColor: 'rgba(212, 160, 23, 0.1)',
                tension: 0.4
            }, {
                label: 'Rejected',
                data: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15],
                borderColor: '#c1292e',
                backgroundColor: 'rgba(193, 41, 46, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Application Trends'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Applications'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

function createMockCharts() {
    // Create simple CSS-based charts when Chart.js is not available
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;

    chartContainer.innerHTML = `
        <div class="mock-chart">
            <div class="chart-bar approved" style="height: 80%;">Approved</div>
            <div class="chart-bar pending" style="height: 60%;">Pending</div>
            <div class="chart-bar rejected" style="height: 30%;">Rejected</div>
        </div>
        <p class="mock-chart-note">Chart.js not loaded - showing simplified view</p>
    `;
}

// ============================================
// DATA TABLES
// ============================================
function initDataTables() {
    const dataTables = document.querySelectorAll('.data-table');

    dataTables.forEach(table => {
        // Add sorting functionality
        initTableSorting(table);

        // Add search functionality
        initTableSearch(table);

        // Add pagination
        initTablePagination(table);

        // Add row selection
        initRowSelection(table);
    });
}

function initTableSorting(table) {
    const headers = table.querySelectorAll('th');

    headers.forEach((header, index) => {
        header.addEventListener('click', function() {
            const isAscending = this.classList.contains('sort-asc');
            const isDescending = this.classList.contains('sort-desc');

            // Reset all headers
            headers.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });

            // Set new sort direction
            if (isAscending) {
                this.classList.add('sort-desc');
                sortTable(table, index, 'desc');
            } else {
                this.classList.add('sort-asc');
                sortTable(table, index, 'asc');
            }
        });

        // Make sortable headers visually distinct
        header.style.cursor = 'pointer';
        header.style.userSelect = 'none';
    });
}

function sortTable(table, columnIndex, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();

        let comparison = 0;

        // Try to parse as numbers first
        const aNum = parseFloat(aValue.replace(/[^\d.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^\d.-]/g, ''));

        if (!isNaN(aNum) && !isNaN(bNum)) {
            comparison = aNum - bNum;
        } else {
            comparison = aValue.localeCompare(bValue);
        }

        return direction === 'asc' ? comparison : -comparison;
    });

    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

function initTableSearch(table) {
    const tableWrapper = table.closest('.table-container');
    if (!tableWrapper) return;

    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'table-search';
    searchContainer.innerHTML = `
        <input type="text" placeholder="Search applications..." class="search-input">
        <select class="filter-select">
            <option value="">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="review">Under Review</option>
        </select>
    `;

    tableWrapper.insertBefore(searchContainer, tableWrapper.firstChild);

    const searchInput = searchContainer.querySelector('.search-input');
    const filterSelect = searchContainer.querySelector('.filter-select');

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const statusBadge = row.querySelector('.status-badge');
            const statusClass = statusBadge ? statusBadge.className.split(' ').find(cls => cls.startsWith('status-')) : '';

            const matchesSearch = text.includes(searchTerm);
            const matchesFilter = !filterValue || statusClass.includes(filterValue);

            row.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterTable);
    filterSelect.addEventListener('change', filterTable);
}

function initTablePagination(table) {
    const rows = table.querySelectorAll('tbody tr');
    if (rows.length <= 10) return; // No pagination needed for small tables

    const tableWrapper = table.closest('.table-container');
    const rowsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    // Create pagination controls
    const pagination = document.createElement('div');
    pagination.className = 'table-pagination';

    function updatePagination() {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        rows.forEach((row, index) => {
            row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
        });

        pagination.innerHTML = `
            <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">Previous</button>
            <span class="page-info">Page ${currentPage} of ${totalPages}</span>
            <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">Next</button>
        `;

        // Add event listeners to pagination buttons
        pagination.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const newPage = parseInt(this.dataset.page);
                if (newPage >= 1 && newPage <= totalPages) {
                    currentPage = newPage;
                    updatePagination();
                }
            });
        });
    }

    tableWrapper.appendChild(pagination);
    updatePagination();
}

function initRowSelection(table) {
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove selection from other rows
            rows.forEach(r => r.classList.remove('selected'));

            // Select this row
            this.classList.add('selected');
        });
    });
}

// ============================================
// ACTION BUTTONS
// ============================================
function initActionButtons() {
    // Review buttons
    document.querySelectorAll('button:contains("Review")').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const appId = row.cells[0].textContent;
            openApplicationReview(appId);
        });
    });

    // Message buttons
    document.querySelectorAll('button:contains("Message")').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const applicantName = row.cells[1].textContent;
            openMessageModal(applicantName);
        });
    });

    // Quick action buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            handleQuickAction(action);
        });
    });
}

function openApplicationReview(appId) {
    // In a real application, this would open a detailed review modal
    alert(`Opening detailed review for application: ${appId}`);
    console.log(`Review application: ${appId}`);
}

function openMessageModal(applicantName) {
    // In a real application, this would open a message composition modal
    alert(`Opening message composer for: ${applicantName}`);
    console.log(`Message applicant: ${applicantName}`);
}

function handleQuickAction(action) {
    switch (action) {
        case 'export-data':
            exportApplicationData();
            break;
        case 'send-bulk-message':
            openBulkMessageModal();
            break;
        case 'generate-report':
            generateReport();
            break;
        case 'settings':
            openSettingsModal();
            break;
        default:
            console.log(`Unknown action: ${action}`);
    }
}

function exportApplicationData() {
    // In a real application, this would trigger a data export
    alert('Data export initiated. You will receive an email when the export is ready.');
    console.log('Exporting application data...');
}

function openBulkMessageModal() {
    // In a real application, this would open a bulk messaging interface
    alert('Bulk messaging interface would open here.');
    console.log('Opening bulk message modal...');
}

function generateReport() {
    // In a real application, this would generate and download a report
    alert('Report generation initiated. The report will be available for download shortly.');
    console.log('Generating report...');
}

function openSettingsModal() {
    // In a real application, this would open system settings
    alert('System settings modal would open here.');
    console.log('Opening settings...');
}

// ============================================
// FILTERS AND SEARCH
// ============================================
function initFilters() {
    // Date range filters
    initDateFilters();

    // Status filters
    initStatusFilters();

    // Advanced filters
    initAdvancedFilters();
}

function initDateFilters() {
    // Add date range inputs to the page (if they don't exist)
    const filterSection = document.querySelector('.card-header');
    if (filterSection && !document.querySelector('.date-filters')) {
        const dateFilters = document.createElement('div');
        dateFilters.className = 'date-filters';
        dateFilters.innerHTML = `
            <label>From: <input type="date" id="dateFrom"></label>
            <label>To: <input type="date" id="dateTo"></label>
            <button class="btn btn-small" id="applyDateFilter">Apply</button>
        `;

        filterSection.appendChild(dateFilters);

        document.getElementById('applyDateFilter').addEventListener('click', function() {
            const fromDate = document.getElementById('dateFrom').value;
            const toDate = document.getElementById('dateTo').value;
            filterApplicationsByDate(fromDate, toDate);
        });
    }
}

function initStatusFilters() {
    // Status filter buttons
    const statusButtons = ['All', 'Approved', 'Pending', 'Rejected', 'Under Review'];

    const filterContainer = document.createElement('div');
    filterContainer.className = 'status-filters';

    statusButtons.forEach(status => {
        const button = document.createElement('button');
        button.className = 'status-filter-btn';
        button.textContent = status;
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.status-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            filterApplicationsByStatus(status.toLowerCase());
        });

        filterContainer.appendChild(button);
    });

    // Add to page
    const cardContent = document.querySelector('.card-content');
    if (cardContent && !document.querySelector('.status-filters')) {
        cardContent.insertBefore(filterContainer, cardContent.firstChild);
    }
}

function initAdvancedFilters() {
    // Province filter
    const provinceFilter = document.createElement('select');
    provinceFilter.className = 'province-filter';
    provinceFilter.innerHTML = `
        <option value="">All Provinces</option>
        <option value="gauteng">Gauteng</option>
        <option value="western-cape">Western Cape</option>
        <option value="kwazulu-natal">KwaZulu-Natal</option>
        <option value="eastern-cape">Eastern Cape</option>
        <option value="limpopo">Limpopo</option>
        <option value="mpumalanga">Mpumalanga</option>
        <option value="north-west">North West</option>
        <option value="northern-cape">Northern Cape</option>
        <option value="free-state">Free State</option>
    `;

    provinceFilter.addEventListener('change', function() {
        filterApplicationsByProvince(this.value);
    });

    // Add to page
    const filterSection = document.querySelector('.card-header');
    if (filterSection && !document.querySelector('.province-filter')) {
        filterSection.appendChild(provinceFilter);
    }
}

function filterApplicationsByDate(fromDate, toDate) {
    const rows = document.querySelectorAll('.data-table tbody tr');

    rows.forEach(row => {
        const dateCell = row.cells[3]; // Assuming date is in the 4th column
        if (dateCell) {
            const rowDate = new Date(dateCell.textContent);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;

            let showRow = true;

            if (from && rowDate < from) showRow = false;
            if (to && rowDate > to) showRow = false;

            row.style.display = showRow ? '' : 'none';
        }
    });
}

function filterApplicationsByStatus(status) {
    const rows = document.querySelectorAll('.data-table tbody tr');

    rows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        if (statusBadge) {
            const badgeClass = statusBadge.className;
            const showRow = status === 'all' ||
                           badgeClass.includes(status) ||
                           (status === 'under review' && badgeClass.includes('review'));

            row.style.display = showRow ? '' : 'none';
        }
    });
}

function filterApplicationsByProvince(province) {
    // In a real application, this would filter based on stored province data
    alert(`Filtering by province: ${province}`);
    console.log(`Filter applications by province: ${province}`);
}

// ============================================
// MODALS
// ============================================
function initModals() {
    // Create modal container if it doesn't exist
    if (!document.querySelector('.modal-overlay')) {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-overlay';
        modalContainer.id = 'adminModal';
        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 id="modalTitle">Modal Title</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body" id="modalBody">
                    Modal content goes here
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="modalCancel">Cancel</button>
                    <button class="btn btn-primary" id="modalConfirm">Confirm</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalContainer);

        // Modal event listeners
        const modal = document.getElementById('adminModal');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = document.getElementById('modalCancel');

        [closeBtn, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

function openModal(title, content, confirmCallback = null) {
    const modal = document.getElementById('adminModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const confirmBtn = document.getElementById('modalConfirm');

    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add('active');

    // Remove previous event listeners
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    if (confirmCallback) {
        newConfirmBtn.addEventListener('click', function() {
            confirmCallback();
            modal.classList.remove('active');
        });
    } else {
        newConfirmBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Bulk operations
function selectAllRows(table) {
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
}

function deselectAllRows(table) {
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function getSelectedRows(table) {
    const selectedRows = [];
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        selectedRows.push({
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            status: row.cells[2].textContent,
            date: row.cells[3].textContent
        });
    });

    return selectedRows;
}

// Export functions
function exportToCSV(data, filename) {
    const csvContent = "data:text/csv;charset=utf-8,"
        + data.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportToPDF(data, filename) {
    // In a real application, this would use a PDF generation library
    alert('PDF export functionality would be implemented here.');
    console.log('Exporting to PDF:', data, filename);
}

// ============================================
// RESPONSIVE BEHAVIOR
// ============================================
function handleAdminResponsiveLayout() {
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
                toggleBtn.addEventListener('click', toggleAdminSidebar);
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

    function toggleAdminSidebar() {
        const isOpen = sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === '';
        sidebar.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0)';
    }

    // Initial layout
    updateLayout();

    // Update on resize
    window.addEventListener('resize', updateLayout);
}

// Initialize responsive behavior
handleAdminResponsiveLayout();

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================
function initAdminAccessibility() {
    // Add keyboard navigation
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

    // Add ARIA labels where needed
    document.querySelectorAll('.data-table').forEach(table => {
        table.setAttribute('role', 'table');
        table.setAttribute('aria-label', 'Applications data table');
    });
}

initAdminAccessibility();

// ============================================
// REAL-TIME UPDATES (Simulated)
// ============================================
function initRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateLiveStats();
    }, 30000);
}

function updateLiveStats() {
    // In a real application, this would fetch live data from the server
    const statElements = document.querySelectorAll('.dashboard-stat .value');

    statElements.forEach((element, index) => {
        // Simulate small random changes
        const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
        if (!isNaN(currentValue)) {
            const change = Math.floor(Math.random() * 6) - 3; // Random change between -3 and +3
            const newValue = Math.max(0, currentValue + change);
            element.textContent = newValue;
        }
    });

    console.log('Live stats updated');
}

// Initialize real-time updates
initRealTimeUpdates();
