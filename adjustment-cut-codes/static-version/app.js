// Mock data for the application
let codes = [
    {
        id: '1',
        code: 'ADJ001',
        description: 'Inventory Count Adjustment',
        wms: 'HighJump',
        instance: 'PROD',
        facility: 'DC-001',
        customer: 'All Customers',
        category: 'Adjustment',
        impactType: 'AMC',
        status: 'Active',
        createdDate: '2024-01-15',
        createdTime: '09:30:00',
        createdBy: 'John Smith',
        lastModified: '2024-01-15'
    },
    {
        id: '2',
        code: 'CUT001',
        description: 'Product Discontinued',
        wms: 'RedPrairie',
        instance: 'PROD',
        facility: 'DC-002',
        customer: 'Customer A',
        category: 'Cut',
        impactType: 'Customer',
        status: 'Active',
        createdDate: '2024-01-10',
        createdTime: '14:15:00',
        createdBy: 'Sarah Johnson',
        lastModified: '2024-01-20'
    },
    {
        id: '3',
        code: 'ADJ002',
        description: 'Damage Adjustment',
        wms: 'JDA',
        instance: 'ARCHIVE',
        facility: 'DC-003',
        customer: 'All Customers',
        category: 'Adjustment',
        impactType: 'No Impact',
        status: 'Archived',
        createdDate: '2023-12-01',
        createdTime: '11:45:00',
        createdBy: 'Mike Davis',
        lastModified: '2024-01-01'
    },
    {
        id: '4',
        code: 'CUT002',
        description: 'Seasonal Item End',
        wms: 'Vision',
        instance: 'PROD',
        facility: 'DC-001',
        customer: 'Customer B',
        category: 'Cut',
        impactType: 'Customer',
        status: 'Active',
        createdDate: '2024-01-05',
        createdTime: '16:20:00',
        createdBy: 'Lisa Wilson',
        lastModified: '2024-01-25'
    },
    {
        id: '5',
        code: 'ADJ003',
        description: 'Cycle Count Variance',
        wms: 'HighJump',
        instance: 'TEST',
        facility: 'DC-004',
        customer: 'Customer C',
        category: 'Adjustment',
        impactType: 'AMC',
        status: 'Active',
        createdDate: '2024-01-20',
        createdTime: '08:00:00',
        createdBy: 'Tom Brown',
        lastModified: '2024-01-20'
    },
    {
        id: '6',
        code: 'CUT003',
        description: 'Expired Product Removal',
        wms: 'PAU/APAC',
        instance: 'PROD',
        facility: 'DC-005',
        customer: 'All Customers',
        category: 'Cut',
        impactType: 'No Impact',
        status: 'Active',
        createdDate: '2024-01-22',
        createdTime: '13:30:00',
        createdBy: 'Emma Garcia',
        lastModified: '2024-01-22'
    },
    {
        id: '7',
        code: 'ADJ004',
        description: 'Physical Count Correction',
        wms: 'RedPrairie',
        instance: 'ARCHIVE',
        facility: 'DC-002',
        customer: 'Customer D',
        category: 'Adjustment',
        impactType: 'Customer',
        status: 'Archived',
        createdDate: '2023-11-15',
        createdTime: '10:15:00',
        createdBy: 'Alex Chen',
        lastModified: '2023-12-01'
    },
    {
        id: '8',
        code: 'CUT004',
        description: 'Recall Item Disposal',
        wms: 'Vision',
        instance: 'PROD',
        facility: 'DC-003',
        customer: 'Customer A',
        category: 'Cut',
        impactType: 'AMC',
        status: 'Active',
        createdDate: '2024-01-18',
        createdTime: '15:45:00',
        createdBy: 'David Lee',
        lastModified: '2024-01-18'
    }
];

let selectedCodes = [];
let sortField = 'code';
let sortDirection = 'asc';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
    updateStats();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('search-input').addEventListener('input', function() {
        renderTable();
    });
    
    // All filter functionality
    document.getElementById('status-filter').addEventListener('change', function() {
        renderTable();
    });
    document.getElementById('filter-source').addEventListener('change', function() {
        renderTable();
    });
    // Facility typeahead
    const facilityInput = document.getElementById('filter-facility-input');
    const facilitySuggestions = document.getElementById('facility-suggestions');
    let facilitySelected = 'all';

    facilityInput.addEventListener('input', function(e) {
        const val = facilityInput.value.toLowerCase();
        const facilities = Array.from(new Set(codes.map(c => c.facility + '||' + c.wms)));
        const filtered = facilities.filter(fw => {
            const [facility, wms] = fw.split('||');
            return val === '' || facility.toLowerCase().includes(val) || wms.toLowerCase().includes(val);
        });
        if (filtered.length === 0) {
            facilitySuggestions.innerHTML = '<div class="px-4 py-2 text-gray-500">No matches</div>';
            facilitySuggestions.classList.remove('hidden');
            return;
        }
        facilitySuggestions.innerHTML = filtered.map((fw, idx) => {
            const [facility, wms] = fw.split('||');
            return `<div class="px-4 py-2 cursor-pointer hover:bg-blue-100" data-facility="${facility}" data-wms="${wms}" tabindex="0" data-idx="${idx}"><span class="font-semibold">${facility}</span> <span class="text-xs text-gray-500">(${wms})</span></div>`;
        }).join('');
        facilitySuggestions.classList.remove('hidden');
    });
    facilityInput.addEventListener('focus', function() {
        facilityInput.dispatchEvent(new Event('input'));
        facilitySuggestions.classList.remove('hidden');
    });
    facilityInput.addEventListener('keydown', function(e) {
        const items = Array.from(facilitySuggestions.querySelectorAll('[data-facility]'));
        if (!items.length) return;
        let idx = items.findIndex(item => item === document.activeElement);
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (idx < 0 || idx === items.length - 1) items[0].focus();
            else items[idx + 1].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (idx <= 0) items[items.length - 1].focus();
            else items[idx - 1].focus();
        } else if (e.key === 'Enter' && idx >= 0) {
            items[idx].click();
        }
    });
    facilitySuggestions.addEventListener('mousedown', function(e) {
        const target = e.target.closest('[data-facility]');
        if (!target) return;
        facilityInput.value = target.getAttribute('data-facility');
        facilitySelected = target.getAttribute('data-facility');
        facilitySuggestions.classList.add('hidden');
        renderTable();
    });
    facilityInput.addEventListener('blur', function() {
        setTimeout(()=>facilitySuggestions.classList.add('hidden'), 150);
    });
    // Clear facility filter if input is cleared
    facilityInput.addEventListener('change', function() {
        if (!facilityInput.value) {
            facilitySelected = 'all';
            renderTable();
        }
    });
    document.getElementById('filter-customer').addEventListener('change', function() {
        renderTable();
    });
    document.getElementById('filter-type').addEventListener('change', function() {
        renderTable();
    });
    document.getElementById('filter-code').addEventListener('input', function() {
        renderTable();
    });
    document.getElementById('filter-responsibility').addEventListener('change', function() {
        renderTable();
    });
    document.getElementById('filter-category').addEventListener('change', function() {
        renderTable();
    });
    
    // Add form submission
    document.getElementById('add-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewCode();
    });
}

// Render the table with current data
function renderTable() {
    // Get all filter values
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const sourceFilter = document.getElementById('filter-source').value;
    const facilityFilter = window.facilitySelected || 'all';
    const customerFilter = document.getElementById('filter-customer').value;
    const typeFilter = document.getElementById('filter-type').value;
    const codeFilter = document.getElementById('filter-code').value.toLowerCase();
    const responsibilityFilter = document.getElementById('filter-responsibility').value;
    const categoryFilter = document.getElementById('filter-category').value;

    // Filter codes
    let filteredCodes = codes.filter(code => {
        const matchesSearch = searchQuery === '' || 
            code.code.toLowerCase().includes(searchQuery) ||
            code.description.toLowerCase().includes(searchQuery) ||
            code.wms.toLowerCase().includes(searchQuery) ||
            code.facility.toLowerCase().includes(searchQuery) ||
            code.customer.toLowerCase().includes(searchQuery);
        const matchesStatus = statusFilter === 'all' || code.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesSource = sourceFilter === 'all' || code.wms === sourceFilter;
        const matchesFacility = facilityFilter === 'all' || code.facility === facilityFilter;
        const matchesCustomer = customerFilter === 'all' || code.customer === customerFilter;
        const matchesType = typeFilter === 'all' || code.category === typeFilter;
        const matchesCode = codeFilter === '' || code.code.toLowerCase().includes(codeFilter);
        const matchesResponsibility = responsibilityFilter === 'all' || code.impactType === responsibilityFilter;
        const matchesCategory = categoryFilter === 'all' || code.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesSource && matchesFacility && matchesCustomer && matchesType && matchesCode && matchesResponsibility && matchesCategory;
    });

    // Sort codes
    filteredCodes.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const direction = sortDirection === 'asc' ? 1 : -1;
        if (aValue < bValue) return -1 * direction;
        if (aValue > bValue) return 1 * direction;
        return 0;
    });

    // Update breakdown cards for filtered data
    const adjustmentCount = filteredCodes.filter(c => c.category === 'Adjustment').length;
    const cutCount = filteredCodes.filter(c => c.category === 'Cut').length;
    const amcCount = filteredCodes.filter(c => c.impactType === 'AMC').length;
    const customerCount = filteredCodes.filter(c => c.impactType === 'Customer').length;
    const noImpactCount = filteredCodes.filter(c => c.impactType === 'No Impact').length;
    const prodCount = filteredCodes.filter(c => c.instance === 'PROD').length;
    const archiveCount = filteredCodes.filter(c => c.instance === 'ARCHIVE').length;
    const testCount = filteredCodes.filter(c => c.instance === 'TEST').length;
    
    document.getElementById('breakdown-adjustment').textContent = adjustmentCount;
    document.getElementById('breakdown-cut').textContent = cutCount;
    document.getElementById('breakdown-amc').textContent = amcCount;
    document.getElementById('breakdown-customer').textContent = customerCount;
    document.getElementById('breakdown-no-impact').textContent = noImpactCount;
    document.getElementById('breakdown-prod').textContent = prodCount;
    document.getElementById('breakdown-archive').textContent = archiveCount;
    document.getElementById('breakdown-test').textContent = testCount;

    // --- Table summary cards below the table ---
    function getMostCommon(arr) {
        if (!arr.length) return '-';
        const freq = {};
        arr.forEach(x => { if(x) freq[x] = (freq[x]||0)+1; });
        let max = 0, val = '-';
        Object.entries(freq).forEach(([k,v]) => { if(v>max) { max=v; val=k; } });
        return val;
    }
    function getMedian(arr) {
        if (!arr.length) return '-';
        const sorted = [...arr].sort();
        const mid = Math.floor(sorted.length/2);
        return sorted.length%2!==0 ? sorted[mid] : sorted[mid-1];
    }
    function formatDate(d) {
        if (!d) return '-';
        return d;
    }
    // Most common values
    document.getElementById('table-common-customer').textContent = getMostCommon(filteredCodes.map(c=>c.customer));
    document.getElementById('table-common-facility').textContent = getMostCommon(filteredCodes.map(c=>c.facility));
    document.getElementById('table-common-wms').textContent = getMostCommon(filteredCodes.map(c=>c.wms));
    document.getElementById('table-common-category').textContent = getMostCommon(filteredCodes.map(c=>c.category));
    document.getElementById('table-common-responsibility').textContent = getMostCommon(filteredCodes.map(c=>c.impactType));
    // Min/Max/Median created date
    const dates = filteredCodes.map(c => c.createdDate).filter(Boolean).sort();
    const minDate = dates[0] || '-';
    const maxDate = dates[dates.length-1] || '-';
    const medianDate = getMedian(dates);
    document.getElementById('table-date-summary').textContent = `${formatDate(minDate)} / ${formatDate(maxDate)} / ${formatDate(medianDate)}`;
    // Average codes per customer
    const customerCounts = {};
    filteredCodes.forEach(c => { if(c.customer) customerCounts[c.customer]=(customerCounts[c.customer]||0)+1; });
    const avgCodesPerCustomer = Object.keys(customerCounts).length ? (filteredCodes.length/Object.keys(customerCounts).length).toFixed(2) : '-';
    document.getElementById('table-avg-codes-customer').textContent = avgCodesPerCustomer;

    // Render table rows
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    if (filteredCodes.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" class="p-8 text-center text-gray-500">
                    No codes found matching your criteria.
                </td>
            </tr>
        `;
        return;
    }
    filteredCodes.forEach(code => {
        const row = document.createElement('tr');
        row.className = 'border-b hover:bg-gray-50';
        row.innerHTML = `
            <td class="p-4 align-middle">
                <input type="checkbox" class="code-checkbox rounded border-gray-300" 
                       value="${code.id}" onchange="toggleCodeSelection('${code.id}')">
            </td>
            <td class="p-4 align-middle font-mono font-medium">${code.code}</td>
            <td class="p-4 align-middle max-w-xs">
                <div class="truncate" title="${code.description}">${code.description}</div>
            </td>
            <td class="p-4 align-middle">
                <div class="text-sm">
                    <div class="font-medium">${code.wms}</div>
                    <div class="text-gray-500">${code.instance}</div>
                </div>
            </td>
            <td class="p-4 align-middle text-sm">${code.facility}</td>
            <td class="p-4 align-middle text-sm">${code.customer}</td>
            <td class="p-4 align-middle">
                <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-gray-300 text-gray-700">
                    ${code.category}
                </span>
            </td>
            <td class="p-4 align-middle">${getImpactBadge(code.impactType)}</td>
            <td class="p-4 align-middle">${getStatusBadge(code.status)}</td>
            <td class="p-4 align-middle">
                <div class="text-sm">
                    <div class="font-medium">${code.createdBy}</div>
                    <div class="text-gray-500">${code.createdDate} ${code.createdTime}</div>
                </div>
            </td>
            <td class="p-4 align-middle">
                <div class="flex items-center space-x-2">
                    <button class="p-1 hover:bg-gray-100 rounded" title="View">
                        <i data-lucide="eye" class="h-4 w-4"></i>
                    </button>
                    <button class="p-1 hover:bg-gray-100 rounded" title="Edit">
                        <i data-lucide="edit" class="h-4 w-4"></i>
                    </button>
                    <button class="p-1 hover:bg-gray-100 rounded" title="Archive">
                        <i data-lucide="archive" class="h-4 w-4"></i>
                    </button>
                    <button class="p-1 hover:bg-gray-100 rounded text-red-600" title="Delete" onclick="deleteCode('${code.id}')">
                        <i data-lucide="trash-2" class="h-4 w-4"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    // Re-initialize Lucide icons for new content
    lucide.createIcons();

    // Auto-populate facility and customer filter dropdowns
    populateFacilityCustomerDropdowns();
    
    // Update additional analytics
    updateAnalytics(filteredCodes);
}

function updateAnalytics(filteredCodes) {
    // Recent Activity
    const recentCodes = [...filteredCodes]
        .sort((a, b) => new Date(b.createdDate + ' ' + b.createdTime) - new Date(a.createdDate + ' ' + a.createdTime))
        .slice(0, 5);
    
    const recentActivityHtml = recentCodes.map(code => `
        <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div>
                <div class="text-sm font-medium">${code.code} - ${code.description}</div>
                <div class="text-xs text-gray-500">by ${code.createdBy} on ${code.createdDate}</div>
            </div>
            <span class="text-xs px-2 py-1 rounded-full ${code.category === 'Adjustment' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                ${code.category}
            </span>
        </div>
    `).join('');
    document.getElementById('recent-activity').innerHTML = recentActivityHtml || '<div class="text-sm text-gray-500">No recent activity</div>';
    
    // Top Contributors
    const contributorCounts = {};
    filteredCodes.forEach(code => {
        contributorCounts[code.createdBy] = (contributorCounts[code.createdBy] || 0) + 1;
    });
    
    const topContributors = Object.entries(contributorCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
    
    const contributorsHtml = topContributors.map(([name, count]) => `
        <div class="flex items-center justify-between py-2">
            <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-xs font-medium text-blue-800">${name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <span class="text-sm font-medium">${name}</span>
            </div>
            <span class="text-sm font-bold text-blue-600">${count}</span>
        </div>
    `).join('');
    document.getElementById('top-contributors').innerHTML = contributorsHtml || '<div class="text-sm text-gray-500">No contributors</div>';
    
    // WMS Chart
    const wmsCounts = {};
    filteredCodes.forEach(code => {
        wmsCounts[code.wms] = (wmsCounts[code.wms] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(wmsCounts), 1);
    const wmsChartHtml = Object.entries(wmsCounts)
        .sort(([,a], [,b]) => b - a)
        .map(([wms, count]) => {
            const percentage = (count / maxCount) * 100;
            return `
                <div class="flex items-center space-x-3">
                    <div class="w-20 text-sm font-medium text-gray-700">${wms}</div>
                    <div class="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div class="bg-blue-500 h-4 rounded-full" style="width: ${percentage}%"></div>
                    </div>
                    <div class="w-8 text-sm font-bold text-gray-700">${count}</div>
                </div>
            `;
        }).join('');
    document.getElementById('wms-chart').innerHTML = wmsChartHtml || '<div class="text-sm text-gray-500">No data available</div>';
}

function populateFacilityCustomerDropdowns() {
    // Get all codes (not just filtered)
    const facilityDropdown = document.getElementById('filter-facility');
    const customerDropdown = document.getElementById('filter-customer');
    const facilities = Array.from(new Set(codes.map(c => c.facility))).sort();
    const customers = Array.from(new Set(codes.map(c => c.customer))).sort();
    const currentFacility = facilityDropdown.value;
    const currentCustomer = customerDropdown.value;
    facilityDropdown.innerHTML = '<option value="all">All Facilities</option>' + facilities.map(f => `<option value="${f}">${f}</option>`).join('');
    customerDropdown.innerHTML = '<option value="all">All Customers</option>' + customers.map(c => `<option value="${c}">${c}</option>`).join('');
    // Restore selected value if possible
    facilityDropdown.value = facilities.includes(currentFacility) ? currentFacility : 'all';
    customerDropdown.value = customers.includes(currentCustomer) ? currentCustomer : 'all';
}


// Get status badge HTML
function getStatusBadge(status) {
    switch (status.toLowerCase()) {
        case 'active':
            return '<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">Active</span>';
        case 'archived':
            return '<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-orange-100 text-orange-800">Archived</span>';
        default:
            return `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">${status}</span>`;
    }
}

// Get impact badge HTML
function getImpactBadge(impactType) {
    switch (impactType.toLowerCase()) {
        case 'amc':
            return '<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">AMC</span>';
        case 'customer':
            return '<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800">Customer</span>';
        case 'no impact':
            return '<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">No Impact</span>';
        default:
            return `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">${impactType}</span>`;
    }
}

// Update statistics
function updateStats() {
    const total = codes.length;
    const active = codes.filter(c => c.status === 'Active').length;
    const archived = codes.filter(c => c.status === 'Archived').length;
    const duplicates = 0; // Would be calculated based on duplicate detection logic
    
    document.getElementById('total-count').textContent = total;
    document.getElementById('active-count').textContent = active;
    document.getElementById('archived-count').textContent = archived;
    document.getElementById('duplicate-count').textContent = duplicates;
}

// Sort table by field
function sortTable(field) {
    if (sortField === field) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortField = field;
        sortDirection = 'asc';
    }
    
    // Update sort indicators
    document.querySelectorAll('[id^="sort-"]').forEach(el => el.textContent = '');
    document.getElementById(`sort-${field}`).textContent = sortDirection === 'asc' ? '↑' : '↓';
    
    renderTable();
}

// Toggle select all
function toggleSelectAll() {
    const selectAll = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.code-checkbox');
    
    selectedCodes = [];
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
        if (selectAll.checked) {
            selectedCodes.push(checkbox.value);
        }
    });
    
    updateBulkActions();
}

// Toggle individual code selection
function toggleCodeSelection(codeId) {
    const index = selectedCodes.indexOf(codeId);
    if (index > -1) {
        selectedCodes.splice(index, 1);
    } else {
        selectedCodes.push(codeId);
    }
    
    updateBulkActions();
    
    // Update select all checkbox
    const totalCheckboxes = document.querySelectorAll('.code-checkbox').length;
    const selectAll = document.getElementById('select-all');
    selectAll.checked = selectedCodes.length === totalCheckboxes && totalCheckboxes > 0;
}

// Update bulk actions bar
function updateBulkActions() {
    const bulkActions = document.getElementById('bulk-actions');
    const selectedCount = document.getElementById('selected-count');
    
    if (selectedCodes.length > 0) {
        bulkActions.classList.remove('hidden');
        selectedCount.textContent = `${selectedCodes.length} item${selectedCodes.length !== 1 ? 's' : ''} selected`;
    } else {
        bulkActions.classList.add('hidden');
    }
}

// Clear selection
function clearSelection() {
    selectedCodes = [];
    document.querySelectorAll('.code-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('select-all').checked = false;
    updateBulkActions();
}

// Delete code
function deleteCode(codeId) {
    if (confirm('Are you sure you want to delete this code?')) {
        codes = codes.filter(code => code.id !== codeId);
        renderTable();
        updateStats();
        clearSelection();
    }
}

// Open add dialog
function openAddDialog() {
    document.getElementById('add-modal').classList.remove('hidden');
}

// Close add dialog
function closeAddDialog() {
    document.getElementById('add-modal').classList.add('hidden');
    document.getElementById('add-form').reset();
}

// Add new code
function addNewCode() {
    const newCode = {
        id: Date.now().toString(),
        code: document.getElementById('new-code').value,
        description: document.getElementById('new-description').value,
        wms: document.getElementById('new-wms').value,
        instance: document.getElementById('new-instance').value,
        facility: document.getElementById('new-facility').value,
        customer: document.getElementById('new-customer').value || 'All Customers',
        category: document.getElementById('new-category').value,
        impactType: document.getElementById('new-impact').value,
        status: 'Active',
        createdDate: new Date().toISOString().split('T')[0],
        createdTime: new Date().toTimeString().split(' ')[0],
        createdBy: 'Current User',
        lastModified: new Date().toISOString().split('T')[0]
    };
    
    // Check for duplicates
    const duplicate = codes.find(code => code.code === newCode.code);
    if (duplicate) {
        alert('A code with this identifier already exists!');
        return;
    }
    
    codes.push(newCode);
    renderTable();
    updateStats();
    closeAddDialog();
    
    // Show success message
    alert('Code added successfully!');
}
