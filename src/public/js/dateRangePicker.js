
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
    const generatorCard = form.closest('[data-report-generator-card]');
    const typeField = form.querySelector('.report-type') || form.querySelector('[name="contentType"]');
    const subjectField = form.querySelector('[name="subjectId"]');
    const quickRangeNode = form.querySelector('[data-range-presets]');
    const trigger = form.querySelector('[data-date-trigger]');
    const popover = form.querySelector('[data-date-popover]');

    popover.addEventListener('click', (event) => {
        event.stopPropagation();
    });

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
    const presetInput = form.querySelector('[data-preset-key]');
    const rangeBadge = document.querySelector('#reportsQuarterBadge');
    const latestReportCreatedAt = generatorCard
        ? generatorCard.querySelector('[data-latest-report-created-at]')
        : null;
    const latestReportPeriod = generatorCard
        ? generatorCard.querySelector('[data-latest-report-period]')
        : null;

    if (
        !trigger
        || !popover
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
        active: 'app-quick-range-button app-quick-range-button--active',
        idle: 'app-quick-range-button app-quick-range-button--idle',
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

    const formatSummaryDate = function formatSummaryDate(date) {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
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

    const getCurrentSubjectId = function getCurrentSubjectId() {
        return subjectField ? String(subjectField.value || '').trim() : '';
    };

    const getStorageKey = function getStorageKey() {
        const subjectId = getCurrentSubjectId();

        if (!subjectId) {
            return '';
        }

        return `lastGeneratedReport:${window.location.pathname}:${getCurrentType()}:${subjectId}`;
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

        if (presetInput) {
            presetInput.value = preset.key || '';
        }

        syncDateInputs();
        renderCalendars();
    };

    const applyDefaultPresetForCurrentType = function applyDefaultPresetForCurrentType() {
        if (getCurrentType() === 'EMPLOYEE') {
            const today = getToday();
            const quarter = Math.floor(today.getMonth() / 3) + 1;

            applyPreset({
                key: `q${quarter}`,
                getRange: () => createQuarterRange(today.getFullYear(), quarter),
            });
            return;
        }

        applyPreset({
            key: 'last-week',
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

    const updateLatestReportPreview = function updateLatestReportPreview(preview) {
        if (!latestReportPeriod || !preview || !preview.periodStart || !preview.periodEnd) {
            return;
        }

        const startDate = parseIsoDate(preview.periodStart);
        const endDate = parseIsoDate(preview.periodEnd);

        if (!startDate || !endDate) {
            return;
        }

        latestReportPeriod.textContent = `${formatSummaryDate(startDate)} - ${formatSummaryDate(endDate)}`;

        if (latestReportCreatedAt && preview.createdAt) {
            const createdAtDate = new Date(preview.createdAt);

            if (!Number.isNaN(createdAtDate.getTime())) {
                latestReportCreatedAt.textContent = createdAtDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                });
            }
        }
    };

    //TODO: Review code
    const hydrateLatestReportPreview = function hydrateLatestReportPreview() {
        const storageKey = getStorageKey();

        if (!storageKey) {
            return;
        }

        const storedPreview = window.sessionStorage.getItem(storageKey);

        if (!storedPreview) {
            return;
        }

        try {
            updateLatestReportPreview(JSON.parse(storedPreview));
        } catch (error) {
            window.sessionStorage.removeItem(storageKey);
        }
    };

    const persistLatestReportPreview = function persistLatestReportPreview() {
        const storageKey = getStorageKey();

        if (!storageKey || !selectedStart || !selectedEnd) {
            return;
        }

        const preview = {
            createdAt: new Date().toISOString(),
            periodEnd: toIsoDate(selectedEnd),
            periodStart: toIsoDate(selectedStart),
        };

        window.sessionStorage.setItem(storageKey, JSON.stringify(preview));
        updateLatestReportPreview(preview);
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
                button.className += ' bg-brand-primary/10 text-brand-text';
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

                if (presetInput) {
                    presetInput.value = '';
                }

                syncDateInputs();
                renderCalendars();

                if (selectedStart && selectedEnd) {
                    closePopover();
                }
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
        const isInsidePopover = popover.contains(event.target);
        const isTrigger = trigger.contains(event.target);

        if (!isInsidePopover && !isTrigger) {
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
        persistLatestReportPreview();
    });

    if (!selectedStart || !selectedEnd) {
        selectedStart = parseIsoDate(startHidden.value);
        selectedEnd = parseIsoDate(endHidden.value);
    }

    syncDateInputs();
    hydrateLatestReportPreview();
    renderCalendars();
};

document.addEventListener('DOMContentLoaded', () => {
    initReportsDateRangePicker();

});
