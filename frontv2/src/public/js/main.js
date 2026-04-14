// --- AJAX Remove Member for Team Participants ---
const initAjaxRemoveMember = function initAjaxRemoveMember() {
    document.querySelectorAll('.remove-member-form').forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const employeeId = form.querySelector('input[name="employeeId"]').value;
            if (!employeeId) return;
            const action = form.action;
            const data = new URLSearchParams();
            data.append('employeeId', employeeId);
            try {
                const res = await fetch(action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: data.toString(),
                });
                if (res.ok) {
                    window.location.reload();
                } else {
                    alert('Failed to remove member.');
                }
            } catch (err) {
                alert('Error removing member.');
            }
        });
    });
};
// Initialize AJAX remove member on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initAjaxRemoveMember();
});
// --- AJAX Add Member for Team Participants ---
const initAjaxAddMember = function initAjaxAddMember() {
    const panel = document.getElementById('addMemberPanel');
    if (!panel) return;
    const form = panel.querySelector('form');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const employeeId = form.querySelector('.add-member-id').value;
        if (!employeeId) return;
        const action = form.action;
        const data = new URLSearchParams();
        data.append('employeeId', employeeId);
        try {
            const res = await fetch(action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: data.toString(),
            });
            if (res.ok) {
                window.location.reload();
            } else {
                alert('Failed to add member.');
            }
        } catch (err) {
            alert('Error adding member.');
        }
    });
};
// Initialize AJAX add member on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initAjaxAddMember();
});

// --- Add Member Autocomplete for Team Participants ---
const initAddMemberAutocomplete = function initAddMemberAutocomplete() {
    const showBtn = document.getElementById('showAddMember');
    const panel = document.getElementById('addMemberPanel');
    if (!showBtn || !panel) return;

    showBtn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            const input = panel.querySelector('.add-member-search');
            if (input) input.focus();
        }
    });

    const form = panel.querySelector('form');
    const searchInput = panel.querySelector('.add-member-search');
    const hiddenInput = panel.querySelector('.add-member-id');
    const resultsPanel = panel.querySelector('.add-member-results');
    const catalogNode = panel.querySelector('.add-member-catalog');
    if (!form || !searchInput || !hiddenInput || !resultsPanel || !catalogNode) return;

    let catalog = [];
    try {
        catalog = JSON.parse(catalogNode.textContent || '[]');
    } catch (e) { return; }

    const normalize = v => String(v || '').trim().toLowerCase();
    const findExact = q => catalog.find(emp => normalize(emp.label) === normalize(q));
    const renderSuggestions = q => {
        const normQ = normalize(q);
        const matches = catalog.filter(emp => normalize(emp.label).includes(normQ)).slice(0, 8);
        resultsPanel.innerHTML = '';
        if (!matches.length) {
            const p = document.createElement('p');
            p.className = 'px-2 py-2 text-sm text-brand-text/60';
            p.textContent = 'No matches found.';
            resultsPanel.appendChild(p);
            resultsPanel.classList.remove('hidden');
            return;
        }
        for (const emp of matches) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'block w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-brand-text transition hover:bg-brand-secondary/30';
            btn.textContent = emp.label;
            btn.addEventListener('mousedown', e => e.preventDefault());
            btn.addEventListener('click', () => {
                hiddenInput.value = emp.id;
                searchInput.value = emp.label;
                searchInput.setCustomValidity('');
                resultsPanel.classList.add('hidden');
            });
            resultsPanel.appendChild(btn);
        }
        resultsPanel.classList.remove('hidden');
    };
    const syncHidden = () => {
        const exact = findExact(searchInput.value);
        hiddenInput.value = exact ? exact.id : '';
    };
    searchInput.addEventListener('input', () => {
        syncHidden();
        searchInput.setCustomValidity('');
        renderSuggestions(searchInput.value);
    });
    searchInput.addEventListener('focus', () => {
        renderSuggestions(searchInput.value);
    });
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !showBtn.contains(e.target)) {
            resultsPanel.classList.add('hidden');
        }
    });
    form.addEventListener('submit', (e) => {
        syncHidden();
        if (hiddenInput.value) {
            searchInput.setCustomValidity('');
            return;
        }
        e.preventDefault();
        searchInput.setCustomValidity('Select a specific employee from the suggestions.');
        searchInput.reportValidity();
    });
    resultsPanel.classList.add('hidden');
};
// Initialize add member autocomplete on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initAddMemberAutocomplete();
});
/*
 * Frontend behavior bootstrap for server-rendered pages.
 *
 * Strategy:
 * - Keep each feature isolated in one initializer.
 * - Each initializer exits immediately if its required DOM nodes are missing.
 * - This lets us load one shared JS file across all pages safely.
 */

const initReportTypeSubjectSelects = function initReportTypeSubjectSelects() {
    const forms = document.querySelectorAll('form');

    for (const form of forms) {
        const typeSelect = form.querySelector('.report-type');
        const subjectSelect = form.querySelector('.report-subject');

        if (!typeSelect || !subjectSelect) {
            continue;
        }

        const applySubjectFilter = function applySubjectFilter() {
            const currentType = typeSelect.value;
            const options = Array.from(subjectSelect.options);

            options.forEach((option, index) => {
                if (index === 0) {
                    option.hidden = false;
                    option.disabled = false;
                    return;
                }

                const isVisible = option.dataset.type === currentType;
                option.hidden = !isVisible;
                option.disabled = !isVisible;
            });

            const hasValidSelection = options.some((option) => {
                return option.value === subjectSelect.value && !option.disabled;
            });

            if (!hasValidSelection) {
                subjectSelect.value = '';
            }
        };

        const defaultType = typeSelect.dataset.default;

        if (defaultType) {
            typeSelect.value = defaultType;
        }

        applySubjectFilter();

        const defaultSubject = subjectSelect.dataset.default;

        if (defaultSubject) {
            subjectSelect.value = defaultSubject;
        }

        applySubjectFilter();
        typeSelect.addEventListener('change', applySubjectFilter);
    }
};

const initEnhancedReportsSubjectSearch = function initEnhancedReportsSubjectSearch() {
    const forms = document.querySelectorAll('[data-report-generator="enhanced"]');

    if (!forms.length) {
        return;
    }

    forms.forEach((form) => {
        initSingleSubjectSearch(form);
    });
};

const initSingleSubjectSearch = function initSingleSubjectSearch(form) {
    // Support both ID-based (reports.ejs) and class-based (reportGenerator partial) selectors
    const typeSelect = form.querySelector('#reportContentType') || form.querySelector('.report-type');
    const searchInput = form.querySelector('#reportSubjectSearch') || form.querySelector('.report-search');
    const hiddenSubjectInput = form.querySelector('#reportSubjectId') || form.querySelector('.report-subject-id');
    const resultsPanel = form.querySelector('#reportSubjectResults') || form.querySelector('.report-search-results');
    const catalogNode = document.querySelector('#report-subject-catalog') || form.querySelector('.report-subject-catalog');

    if (
        !typeSelect
        || !searchInput
        || !hiddenSubjectInput
        || !resultsPanel
        || !catalogNode
    ) {
        return;
    }

    let catalog = {};

    try {
        catalog = JSON.parse(catalogNode.textContent || '{}');
    } catch (error) {
        return;
    }

    const normalize = function normalize(value) {
        return String(value || '').trim().toLowerCase();
    };

    const getSubjectsForType = function getSubjectsForType() {
        return catalog[typeSelect.value] || [];
    };

    const findExactSubject = function findExactSubject(query) {
        const target = normalize(query);

        if (!target) {
            return null;
        }

        for (const subject of getSubjectsForType()) {
            if (normalize(subject.label) === target) {
                return subject;
            }
        }

        return null;
    };

    const hideResults = function hideResults() {
        resultsPanel.classList.add('hidden');
    };

    const showResults = function showResults() {
        resultsPanel.classList.remove('hidden');
    };

    const selectSubject = function selectSubject(subject) {
        hiddenSubjectInput.value = subject.id;
        searchInput.value = subject.label;
        searchInput.setCustomValidity('');
        hideResults();
    };

    const renderSuggestions = function renderSuggestions(query) {
        const normalizedQuery = normalize(query);
        const subjects = getSubjectsForType();
        const matches = [];

        for (const subject of subjects) {
            const label = normalize(subject.label);

            if (label.includes(normalizedQuery)) {
                matches.push(subject);
            }

            if (matches.length >= 8) {
                break;
            }
        }

        resultsPanel.innerHTML = '';

        if (!matches.length) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'px-2 py-2 text-sm text-brand-text/60';
            emptyMessage.textContent = 'No matches found.';

            resultsPanel.appendChild(emptyMessage);
            showResults();
            return;
        }

        for (const subject of matches) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = [
                'block w-full rounded-lg px-2 py-2 text-left text-sm font-medium',
                'text-brand-text transition hover:bg-brand-secondary/30',
            ].join(' ');
            button.textContent = subject.label;

            // Keep focus on input while clicking suggestion.
            button.addEventListener('mousedown', (event) => event.preventDefault());
            button.addEventListener('click', () => selectSubject(subject));

            resultsPanel.appendChild(button);
        }

        showResults();
    };

    const syncHiddenWithInput = function syncHiddenWithInput() {
        const exactMatch = findExactSubject(searchInput.value);
        hiddenSubjectInput.value = exactMatch ? exactMatch.id : '';
    };

    typeSelect.addEventListener('change', () => {
        hiddenSubjectInput.value = '';
        searchInput.value = '';
        searchInput.setCustomValidity('');
        hideResults();
    });

    searchInput.addEventListener('input', () => {
        syncHiddenWithInput();
        searchInput.setCustomValidity('');
        renderSuggestions(searchInput.value);
    });

    searchInput.addEventListener('focus', () => {
        renderSuggestions(searchInput.value);
    });

    document.addEventListener('click', (event) => {
        if (!form.contains(event.target)) {
            hideResults();
        }
    });

    form.addEventListener('submit', (event) => {
        syncHiddenWithInput();

        if (hiddenSubjectInput.value) {
            searchInput.setCustomValidity('');
            return;
        }

        event.preventDefault();
        searchInput.setCustomValidity('Select a specific subject from the suggestions.');
        searchInput.reportValidity();
    });

    hideResults();
};

const initReportsDateRangePicker = function initReportsDateRangePicker() {
    const forms = document.querySelectorAll('[data-report-generator="enhanced"]');

    if (!forms.length) {
        return;
    }

    forms.forEach((form) => {
        initSingleDateRangePicker(form);
    });
};

const initSingleDateRangePicker = function initSingleDateRangePicker(form) {
    const typeField = form.querySelector('.report-type') || form.querySelector('[name="contentType"]');
    const quickRangeNode = form.querySelector('[data-range-presets]');
    const trigger = form.querySelector('[data-date-trigger]');
    const popover = form.querySelector('[data-date-popover]');
    const shortcutsNode = form.querySelector('[data-date-shortcuts]');
    const startDisplay = form.querySelector('[data-start-display]');
    const endDisplay = form.querySelector('[data-end-display]');
    const startHidden = form.querySelector('[data-start-value]');
    const endHidden = form.querySelector('[data-end-value]');
    const leftMonthNode = form.querySelector('[data-calendar-month="left"]');
    const rightMonthNode = form.querySelector('[data-calendar-month="right"]');
    const leftLabel = form.querySelector('[data-calendar-label="left"]');
    const rightLabel = form.querySelector('[data-calendar-label="right"]');
    const applyButton = form.querySelector('[data-date-apply]');
    const rangeBadge = document.querySelector('#reportsQuarterBadge');

    if (
        !trigger
        || !popover
        || !startDisplay
        || !endDisplay
        || !startHidden
        || !endHidden
        || !leftMonthNode
        || !rightMonthNode
        || !leftLabel
        || !rightLabel
        || !applyButton
    ) {
        return;
    }

    const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const presetButtonClass = {
        active: 'rounded-lg border border-brand-primary bg-brand-primary px-3 py-1 text-sm '
            + 'font-semibold text-white transition',
        idle: 'rounded-lg border border-brand-secondary px-3 py-1 text-sm font-semibold '
            + 'text-brand-text/80 transition hover:bg-brand-secondary/20',
    };

    const parseIsoDate = function parseIsoDate(value) {
        if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return null;
        }

        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const toIsoDate = function toIsoDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = function formatDisplayDate(date) {
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const createMonthStart = function createMonthStart(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    const createDayDate = function createDayDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const addMonths = function addMonths(date, delta) {
        return new Date(date.getFullYear(), date.getMonth() + delta, 1);
    };

    const getToday = function getToday() {
        return createDayDate(new Date());
    };

    const getCurrentType = function getCurrentType() {
        return typeField ? typeField.value : 'EMPLOYEE';
    };

    const createQuarterRange = function createQuarterRange(year, quarter) {
        return {
            start: new Date(year, (quarter - 1) * 3, 1),
            end: new Date(year, quarter * 3, 0),
        };
    };

    const createTrailingDaysRange = function createTrailingDaysRange(totalDays) {
        const end = getToday();
        const start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - (totalDays - 1));

        return { start, end };
    };

    const getReferenceYear = function getReferenceYear() {
        if (selectedStart) {
            return selectedStart.getFullYear();
        }

        return baseMonth.getFullYear();
    };

    let selectedStart = parseIsoDate(startHidden.value);
    let selectedEnd = parseIsoDate(endHidden.value);
    let baseMonth = createMonthStart(
        selectedStart || parseIsoDate(startHidden.value) || new Date(),
    );

    const sortRange = function sortRange() {
        if (selectedStart && selectedEnd && selectedEnd < selectedStart) {
            const temp = selectedStart;
            selectedStart = selectedEnd;
            selectedEnd = temp;
        }
    };

    const hasSameRange = function hasSameRange(range) {
        if (!selectedStart || !selectedEnd || !range) {
            return false;
        }

        return toIsoDate(selectedStart) === toIsoDate(range.start)
            && toIsoDate(selectedEnd) === toIsoDate(range.end);
    };

    const getPresetDefinitions = function getPresetDefinitions() {
        if (getCurrentType() === 'EMPLOYEE') {
            const referenceYear = getReferenceYear();

            return [1, 2, 3, 4].map((quarter) => {
                return {
                    key: `q${quarter}`,
                    label: `Q${quarter}`,
                    title: `Quarter ${quarter} ${referenceYear}`,
                    getRange: () => createQuarterRange(referenceYear, quarter),
                };
            });
        }

        return [
            {
                key: 'last-week',
                label: 'Last Week',
                getRange: () => createTrailingDaysRange(7),
            },
            {
                key: 'last-two-weeks',
                label: 'Last 2 Weeks',
                getRange: () => createTrailingDaysRange(14),
            },
            {
                key: 'last-month',
                label: 'Last Month',
                getRange: () => createTrailingDaysRange(30),
            },
        ];
    };

    const getActivePreset = function getActivePreset() {
        for (const preset of getPresetDefinitions()) {
            if (hasSameRange(preset.getRange())) {
                return preset;
            }
        }

        return null;
    };

    const applyPreset = function applyPreset(preset) {
        const range = preset.getRange();

        selectedStart = range.start;
        selectedEnd = range.end;
        baseMonth = createMonthStart(selectedStart);

        syncDateInputs();
        renderCalendars();
    };

    const applyDefaultPresetForCurrentType = function applyDefaultPresetForCurrentType() {
        if (getCurrentType() === 'EMPLOYEE') {
            const today = getToday();
            const quarter = Math.floor(today.getMonth() / 3) + 1;

            applyPreset({
                getRange: () => createQuarterRange(today.getFullYear(), quarter),
            });
            return;
        }

        applyPreset({
            getRange: () => createTrailingDaysRange(7),
        });
    };

    const renderPresetButtons = function renderPresetButtons(targetNode) {
        if (!targetNode) {
            return;
        }

        const activePreset = getActivePreset();

        targetNode.innerHTML = '';

        getPresetDefinitions().forEach((preset) => {
            const button = document.createElement('button');
            const isActive = activePreset && activePreset.key === preset.key;

            button.type = 'button';
            button.textContent = preset.label;
            button.title = preset.title || preset.label;
            button.className = isActive ? presetButtonClass.active : presetButtonClass.idle;
            button.addEventListener('click', () => {
                applyPreset(preset);
            });

            targetNode.appendChild(button);
        });
    };

    const updatePresetStyles = function updatePresetStyles() {
        const activePreset = getActivePreset();

        renderPresetButtons(quickRangeNode);
        renderPresetButtons(shortcutsNode);

        if (rangeBadge) {
            rangeBadge.textContent = activePreset ? activePreset.label : 'Custom';
        }
    };

    const syncDateInputs = function syncDateInputs() {
        sortRange();

        startHidden.value = selectedStart ? toIsoDate(selectedStart) : '';
        endHidden.value = selectedEnd ? toIsoDate(selectedEnd) : '';

        startDisplay.value = selectedStart ? formatDisplayDate(selectedStart) : '';
        endDisplay.value = selectedEnd ? formatDisplayDate(selectedEnd) : '';

        updatePresetStyles();
    };

    const renderMonth = function renderMonth(targetNode, monthDate) {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        const firstWeekday = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        targetNode.innerHTML = '';

        const weekdayRow = document.createElement('div');
        weekdayRow.className = [
            'grid grid-cols-7 gap-1 text-center text-xs font-semibold',
            'text-brand-text/50',
        ].join(' ');

        weekdayLabels.forEach((label) => {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = label;
            weekdayRow.appendChild(dayLabel);
        });

        targetNode.appendChild(weekdayRow);

        const dayGrid = document.createElement('div');
        dayGrid.className = 'mt-2 grid grid-cols-7 gap-1';

        for (let offset = 0; offset < firstWeekday; offset += 1) {
            const emptyCell = document.createElement('div');
            dayGrid.appendChild(emptyCell);
        }

        for (let day = 1; day <= totalDays; day += 1) {
            const date = new Date(year, month, day);
            const dateIso = toIsoDate(date);
            const isStart = selectedStart && dateIso === toIsoDate(selectedStart);
            const isEnd = selectedEnd && dateIso === toIsoDate(selectedEnd);
            const inRange = selectedStart
                && selectedEnd
                && date > selectedStart
                && date < selectedEnd;

            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = String(day);
            button.className = 'h-8 w-8 rounded-full text-xs font-semibold transition';

            if (isStart || isEnd) {
                button.className += ' bg-brand-primary text-white';
            } else if (inRange) {
                button.className += ' bg-brand-primary/15 text-brand-text';
            } else {
                button.className += ' text-brand-text/80 hover:bg-brand-secondary/30';
            }

            button.addEventListener('click', () => {
                if (!selectedStart || (selectedStart && selectedEnd)) {
                    selectedStart = date;
                    selectedEnd = null;
                } else if (date < selectedStart) {
                    selectedEnd = selectedStart;
                    selectedStart = date;
                } else {
                    selectedEnd = date;
                }

                syncDateInputs();
                renderCalendars();
            });

            dayGrid.appendChild(button);
        }

        targetNode.appendChild(dayGrid);
    };

    const renderCalendars = function renderCalendars() {
        const rightMonth = addMonths(baseMonth, 1);

        leftLabel.textContent = baseMonth.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });

        rightLabel.textContent = rightMonth.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });

        renderMonth(leftMonthNode, baseMonth);
        renderMonth(rightMonthNode, rightMonth);
    };

    const openPopover = function openPopover() {
        popover.classList.remove('hidden');
    };

    const closePopover = function closePopover() {
        popover.classList.add('hidden');
    };

    trigger.addEventListener('click', () => {
        if (popover.classList.contains('hidden')) {
            openPopover();
            return;
        }

        closePopover();
    });

    form.querySelectorAll('[data-calendar-nav]').forEach((button) => {
        button.addEventListener('click', () => {
            const direction = button.dataset.calendarNav === 'prev' ? -1 : 1;
            baseMonth = addMonths(baseMonth, direction);
            renderCalendars();
        });
    });

    applyButton.addEventListener('click', () => {
        if (!selectedStart && !selectedEnd) {
            startDisplay.setCustomValidity('Select a date range.');
            startDisplay.reportValidity();
            return;
        }

        if (selectedStart && !selectedEnd) {
            selectedEnd = selectedStart;
            syncDateInputs();
            renderCalendars();
        }

        startDisplay.setCustomValidity('');
        closePopover();
    });

    document.addEventListener('click', (event) => {
        if (!form.contains(event.target)) {
            closePopover();
        }
    });

    if (typeField && typeField.tagName === 'SELECT') {
        typeField.addEventListener('change', () => {
            applyDefaultPresetForCurrentType();
        });
    }

    form.addEventListener('submit', (event) => {
        if (!startHidden.value || !endHidden.value) {
            event.preventDefault();
            startDisplay.setCustomValidity('Select and apply a date range first.');
            startDisplay.reportValidity();
            return;
        }

        startDisplay.setCustomValidity('');
    });

    if (!selectedStart || !selectedEnd) {
        selectedStart = parseIsoDate(startHidden.value);
        selectedEnd = parseIsoDate(endHidden.value);
    }

    syncDateInputs();
    renderCalendars();
};

const initAccountImageUpload = function initAccountImageUpload() {
    const fileInput = document.querySelector('#accountImageFile');
    const hiddenInput = document.querySelector('#accountImageValue');
    const preview = document.querySelector('#accountImagePreview');
    const filename = document.querySelector('#accountImageFilename');

    if (!fileInput || !hiddenInput || !preview || !filename) {
        return;
    }

    fileInput.addEventListener('change', () => {
        const [file] = fileInput.files || [];

        if (!file) {
            filename.textContent = 'No file selected';
            return;
        }

        if (!file.type.startsWith('image/')) {
            fileInput.value = '';
            filename.textContent = 'Invalid file type. Select an image.';
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const imageDataUrl = String(reader.result || '');

            hiddenInput.value = imageDataUrl;
            preview.src = imageDataUrl;
            filename.textContent = file.name;
        };

        reader.readAsDataURL(file);
    });
};

const initCreateAccountPasswordGenerator = function initCreateAccountPasswordGenerator() {
    const passwordInput = document.querySelector('#createAccountPassword');
    const generateButton = document.querySelector('#generateAccountPasswordBtn');
    const hint = document.querySelector('#generateAccountPasswordHint');

    if (!passwordInput || !generateButton || !hint) {
        return;
    }

    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%_-';
    const passwordLength = 14;

    const getRandomIndex = (max) => {
        if (window.crypto && window.crypto.getRandomValues) {
            const randomArray = new Uint32Array(1);
            window.crypto.getRandomValues(randomArray);
            return randomArray[0] % max;
        }

        return Math.floor(Math.random() * max);
    };

    const buildPassword = () => {
        let generatedPassword = '';

        for (let index = 0; index < passwordLength; index += 1) {
            generatedPassword += charset[getRandomIndex(charset.length)];
        }

        return generatedPassword;
    };

    generateButton.addEventListener('click', async () => {
        const generatedPassword = buildPassword();

        passwordInput.value = generatedPassword;
        hint.textContent = `Generated: ${generatedPassword}`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(generatedPassword);
                hint.textContent = `Generated and copied: ${generatedPassword}`;
            } catch (_error) {
                // Clipboard can fail if browser permissions are denied; value remains filled in input.
            }
        }
    });
};

const initTopbarAccountMenu = function initTopbarAccountMenu() {
    const menuRoot = document.querySelector('[data-account-menu]');

    if (!menuRoot) {
        return;
    }

    const toggle = menuRoot.querySelector('[data-account-menu-toggle]');
    const panel = menuRoot.querySelector('[data-account-menu-panel]');

    if (!toggle || !panel) {
        return;
    }

    const openMenu = function openMenu() {
        panel.classList.remove('hidden');
        toggle.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = function closeMenu() {
        panel.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();

        if (panel.classList.contains('hidden')) {
            openMenu();
            return;
        }

        closeMenu();
    });

    document.addEventListener('click', (event) => {
        if (!menuRoot.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
};

// Safe to call globally. Each initializer checks whether required DOM exists.
initReportTypeSubjectSelects();
initEnhancedReportsSubjectSearch();
initReportsDateRangePicker();
initAccountImageUpload();
initCreateAccountPasswordGenerator();
initTopbarAccountMenu();
