// ============================================
// NATIONAL MILITARY TRAINING PROGRAMME
// Admin Dashboard JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initAdminDashboard();
    handleAdminResponsiveLayout();
    initAdminAccessibility();
    initRealTimeUpdates();
});

function initAdminDashboard() {
    initAdminSidebarNavigation();
    initCharts();
    initDataTables();
    initActionButtons();
    initFilters();
    initModals();
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================
function initAdminSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const mainContent = document.querySelector('.dashboard-main');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Close mobile sidebar after selection
            if (window.innerWidth < 1024 && sidebar) {
                sidebar.classList.remove('active');
            }

            // Update main content
            const sectionId = this.getAttribute('href').substring(1);
            updateAdminMainContent(sectionId);
        });
    });
}

function updateAdminMainContent(sectionId) {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

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
    if (typeof Chart !== 'undefined') {
        initApplicationChart();
    } else {
        createMockCharts();
    }
}

function initApplicationChart() {
    const ctx = document.getElementById('applicationChart');
    if (!ctx) return;

    new Chart(ctx, {
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
                legend: { position: 'top' },
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
        initTableSorting(table);
        initTableSearch(table);
        initTablePagination(table);
        initRowSelection(table);
    });
}

function initTableSorting(table) {
    const headers = table.querySelectorAll('th');

    headers.forEach((header, index) => {
        header.addEventListener('click', function() {
            const isAscending = this.classList.contains('sort-asc');

            headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));

            if (isAscending) {
                this.classList.add('sort-desc');
                sortTable(table, index, 'desc');
            } else {
                this.classList.add('sort-asc');
                sortTable(table, index, 'asc');
            }
        });

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

        const aNum = parseFloat(aValue.replace(/[^\d.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^\d.-]/g, ''));

        let comparison = 0;

        if (!isNaN(aNum) && !isNaN(bNum)) {
            comparison = aNum - bNum;
        } else {
            comparison = aValue.localeCompare(bValue);
        }

        return direction === 'asc' ? comparison : -comparison;
    });

    rows.forEach(row => tbody.appendChild(row));
}

function initTableSearch(table) {
    const tableWrapper = table.closest('.table-container');
    if (!tableWrapper || document.querySelector('.table-search')) return;

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
            const statusClass = statusBadge ? statusBadge.className : '';

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
    if (rows.length <= 10) return;

    const tableWrapper = table.closest('.table-container');
    const rowsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(rows.length / rowsPerPage);

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

        pagination.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
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
            rows.forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// ============================================
// ACTION BUTTONS
// ============================================
function initActionButtons() {
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const buttonText = button.textContent.trim().toLowerCase();
        const row = button.closest('tr');

        if (buttonText.includes('review') && row) {
            const appId = row.cells[0].textContent;
            openApplicationReview(appId);
        } else if (buttonText.includes('message') && row) {
            const applicantName = row.cells[1].textContent;
            openMessageModal(applicantName);
        } else if (button.classList.contains('action-btn')) {
            const action = buttonText.replace(/\s+/g, '-');
            handleQuickAction(action);
        }
    });
}

function openApplicationReview(appId) {
    console.log(`Review application: ${appId}`);
    openModal('Application Review', `<p>Reviewing application: ${appId}</p>`);
}

function openMessageModal(applicantName) {
    console.log(`Message applicant: ${applicantName}`);
    openModal('Send Message', `<textarea placeholder="Message for ${applicantName}..." style="width:100%; height:150px;"></textarea>`);
}

function handleQuickAction(action) {
    const actions = {
        'export-data': exportApplicationData,
        'send-bulk-message': openBulkMessageModal,
        'generate-report': generateReport,
        'settings': openSettingsModal
    };

    if (actions[action]) {
        actions[action]();
    } else {
        console.log(`Unknown action: ${action}`);
    }
}

function exportApplicationData() {
    console.log('Exporting application data...');
    openModal('Export Data', '<p>Data export initiated. You will receive an email when ready.</p>');
}

function openBulkMessageModal() {
    console.log('Opening bulk message modal...');
    openModal('Bulk Message', '<textarea placeholder="Enter message..." style="width:100%; height:150px;"></textarea>');
}

function generateReport() {
    console.log('Generating report...');
    openModal('Generate Report', '<p>Report generation initiated. Download will start shortly.</p>');
}

function openSettingsModal() {
    console.log('Opening settings...');
    openModal('System Settings', '<p>System settings panel would appear here.</p>');
}

// ============================================
// FILTERS AND SEARCH
// ============================================
function initFilters() {
    initDateFilters();
    initStatusFilters();
    initAdvancedFilters();
}

function initDateFilters() {
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
    const statusButtons = ['All', 'Approved', 'Pending', 'Rejected', 'Under Review'];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'status-filters';

    statusButtons.forEach(status => {
        const button = document.createElement('button');
        button.className = 'status-filter-btn';
        button.textContent = status;
        button.addEventListener('click', function() {
            document.querySelectorAll('.status-filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterApplicationsByStatus(status.toLowerCase());
        });
        filterContainer.appendChild(button);
    });

    const cardContent = document.querySelector('.card-content');
    if (cardContent && !document.querySelector('.status-filters')) {
        cardContent.insertBefore(filterContainer, cardContent.firstChild);
    }
}

function initAdvancedFilters() {
    const filterSection = document.querySelector('.card-header');
    if (filterSection && !document.querySelector('.province-filter')) {
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
        filterSection.appendChild(provinceFilter);
    }
}

function filterApplicationsByDate(fromDate, toDate) {
    const rows = document.querySelectorAll('.data-table tbody tr');

    rows.forEach(row => {
        const dateCell = row.cells[3];
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
            const showRow = status === 'all' || badgeClass.includes(status) || 
                           (status === 'under review' && badgeClass.includes('review'));
            row.style.display = showRow ? '' : 'none';
        }
    });
}

function filterApplicationsByProvince(province) {
    console.log(`Filter applications by province: ${province}`);
}

// ============================================
// MODALS
// ============================================
function initModals() {
    if (!document.querySelector('.modal-overlay')) {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-overlay';
        modalContainer.id = 'adminModal';
        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 id="modalTitle">Modal Title</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body" id="modalBody">Modal content</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="modalCancel">Cancel</button>
                    <button class="btn btn-primary" id="modalConfirm">Confirm</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalContainer);

        const modal = document.getElementById('adminModal');
        const closeModal = () => modal.classList.remove('active');

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        document.getElementById('modalCancel').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
}

function openModal(title, content, confirmCallback = null) {
    const modal = document.getElementById('adminModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    modal.classList.add('active');

    const confirmBtn = document.getElementById('modalConfirm');
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.addEventListener('click', function() {
        if (confirmCallback) confirmCallback();
        modal.classList.remove('active');
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function selectAllRows(table) {
    table.querySelectorAll('tbody input[type="checkbox"]').forEach(cb => cb.checked = true);
}

function deselectAllRows(table) {
    table.querySelectorAll('tbody input[type="checkbox"]').forEach(cb => cb.checked = false);
}

function getSelectedRows(table) {
    const selectedRows = [];
    table.querySelectorAll('tbody input[type="checkbox"]:checked').forEach(checkbox => {
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

function exportToCSV(data, filename) {
    const csvContent = "data:text/csv;charset=utf-8," + 
        data.map(row => Object.values(row).join(",")).join("\n");
    
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", filename);
    link.click();
}

function exportToPDF(data, filename) {
    console.log('PDF export would use a library like jsPDF');
}

// ============================================
// RESPONSIVE BEHAVIOR
// ============================================
function handleAdminResponsiveLayout() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const main = document.querySelector('.dashboard-main');
    const header = document.querySelector('.dashboard-header');

    if (!sidebar || !main) return;

    function updateLayout() {
        const isMobile = window.innerWidth < 1024;

        if (isMobile) {
            sidebar.classList.remove('active');
            if (!document.querySelector('.sidebar-toggle')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'sidebar-toggle btn btn-small';
                toggleBtn.setAttribute('aria-label', 'Toggle menu');
                toggleBtn.innerHTML = '☰ Menu';
                toggleBtn.addEventListener('click', toggleSidebar);
                header.prepend(toggleBtn);
            }
        } else {
            sidebar.classList.add('active');
            const toggleBtn = document.querySelector('.sidebar-toggle');
            if (toggleBtn) toggleBtn.remove();
        }
    }

    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================
function initAdminAccessibility() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    document.querySelectorAll('button, a, input, select, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--teal)';
        });
        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });

    document.querySelectorAll('.data-table').forEach(table => {
        table.setAttribute('role', 'table');
        table.setAttribute('aria-label', 'Applications data table');
    });
}

// ============================================
// REAL-TIME UPDATES
// ============================================
function initRealTimeUpdates() {
    setInterval(updateLiveStats, 30000);
}

function updateLiveStats() {
    document.querySelectorAll('.dashboard-stat .value').forEach(element => {
        const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
        if (!isNaN(currentValue)) {
            const change = Math.floor(Math.random() * 6) - 3;
            element.textContent = Math.max(0, currentValue + change);
        }
    });
    console.log('Live stats updated');
}
