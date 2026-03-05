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
    const trigger = form.querySelector('[data-date-trigger]');
    const popover = form.querySelector('[data-date-popover]');
    const startDisplay = form.querySelector('[data-start-display]');
    const endDisplay = form.querySelector('[data-end-display]');
    const startHidden = form.querySelector('[data-start-value]');
    const endHidden = form.querySelector('[data-end-value]');
    const leftMonthNode = form.querySelector('[data-calendar-month="left"]');
    const rightMonthNode = form.querySelector('[data-calendar-month="right"]');
    const leftLabel = form.querySelector('[data-calendar-label="left"]');
    const rightLabel = form.querySelector('[data-calendar-label="right"]');
    const applyButton = form.querySelector('[data-date-apply]');
    const quarterButtons = form.querySelectorAll('[data-quarter]');
    const quarterBadge = document.querySelector('#reportsQuarterBadge');

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

    const addMonths = function addMonths(date, delta) {
        return new Date(date.getFullYear(), date.getMonth() + delta, 1);
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

    const getFullQuarterForRange = function getFullQuarterForRange() {
        if (!selectedStart || !selectedEnd) {
            return null;
        }

        for (let quarter = 1; quarter <= 4; quarter += 1) {
            const year = selectedStart.getFullYear();
            const quarterStart = new Date(year, (quarter - 1) * 3, 1);
            const quarterEnd = new Date(year, quarter * 3, 0);

            if (
                toIsoDate(quarterStart) === toIsoDate(selectedStart)
                && toIsoDate(quarterEnd) === toIsoDate(selectedEnd)
            ) {
                return quarter;
            }
        }

        return null;
    };

    const updateQuarterButtonStyles = function updateQuarterButtonStyles() {
        const activeQuarter = getFullQuarterForRange();

        quarterButtons.forEach((button) => {
            const isActive = Number(button.dataset.quarter) === activeQuarter;

            button.className = isActive
                ? 'rounded-lg border border-brand-primary bg-brand-primary px-3 py-1 text-sm '
                    + 'font-semibold text-white transition'
                : 'rounded-lg border border-brand-secondary px-3 py-1 text-sm font-semibold '
                    + 'text-brand-text/80 transition hover:bg-brand-secondary/20';
        });

        if (quarterBadge) {
            quarterBadge.textContent = activeQuarter ? `Q${activeQuarter}` : 'Custom';
        }
    };

    const syncDateInputs = function syncDateInputs() {
        sortRange();

        startHidden.value = selectedStart ? toIsoDate(selectedStart) : '';
        endHidden.value = selectedEnd ? toIsoDate(selectedEnd) : '';

        startDisplay.value = selectedStart ? formatDisplayDate(selectedStart) : '';
        endDisplay.value = selectedEnd ? formatDisplayDate(selectedEnd) : '';

        updateQuarterButtonStyles();
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

    quarterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const quarter = Number(button.dataset.quarter);
            const referenceYear = baseMonth.getFullYear();

            selectedStart = new Date(referenceYear, (quarter - 1) * 3, 1);
            selectedEnd = new Date(referenceYear, quarter * 3, 0);
            baseMonth = createMonthStart(selectedStart);

            syncDateInputs();
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
initTopbarAccountMenu();
