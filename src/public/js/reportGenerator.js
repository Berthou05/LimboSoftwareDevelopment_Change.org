const normalizeSubjectEntry = function normalizeSubjectEntry(subject) {
    const subjectId = subject.id || subject.employee_id || subject.team_id || subject.project_id || '';
    const subjectLabel = subject.label || subject.name || subject.full_name || '';

    return {
        id: String(subjectId || '').trim(),
        label: String(subjectLabel || '').trim(),
    };
};

const formatReportCreatedAt = function formatReportCreatedAt(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const formatReportPeriod = function formatReportPeriod(startValue, endValue) {
    const startDate = new Date(startValue);
    const endDate = new Date(endValue);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return '';
    }

    const formatter = {
        month: 'short',
        day: 'numeric',
    };

    return `${startDate.toLocaleDateString('en-US', formatter)} - ${endDate.toLocaleDateString('en-US', formatter)}`;
};


const renderReportGeneratorFlash = (form, flash) => {
    if (!flash) return;

    const generatorCard = form.closest('[data-report-generator-card]');
    if (!generatorCard) return;

    let flashNode = generatorCard.querySelector('[data-report-generator-flash]');

    if (!flashNode) {
        flashNode = document.createElement('div');
        flashNode.setAttribute('data-report-generator-flash', '');
        generatorCard.insertBefore(flashNode, generatorCard.firstChild);
    }

    flashNode.className = `mb-4 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ease-out ${
        flash.type === 'error'
            ? 'border-red-200 bg-red-50 text-red-700'
            : 'border-green-200 bg-green-50 text-green-700'
    }`;

    flashNode.textContent = flash.message;

    // optional auto-hide
    setTimeout(() => {
        flashNode.classList.add('opacity-0', 'translate-y-2');

        setTimeout(() => {
            flashNode.remove();
        }, 300);
    }, 4000);
};

const updateLatestReportCard = function updateLatestReportCard(form, payload) {
    const generatorCard = form.closest('[data-report-generator-card]');
    if (!generatorCard || !payload) return;

    const latestReportContainer = generatorCard.querySelector('[data-latest-report-container]');
    const latestReportTitle = generatorCard.querySelector('[data-latest-report-title]');
    const latestReportCreatedAt = generatorCard.querySelector('[data-latest-report-created-at]');
    const latestReportPeriod = generatorCard.querySelector('[data-latest-report-period]');
    const latestReportLink = generatorCard.querySelector('[data-latest-report-link]');
    const redirectToField = form.querySelector('[name="redirectTo"]');
    const redirectTo = redirectToField ? String(redirectToField.value || '/home') : '/home';

    if (!latestReportContainer || !latestReportTitle || !latestReportCreatedAt || !latestReportPeriod || !latestReportLink) {
        return;
    }

    latestReportContainer.classList.remove('hidden', 'opacity-0', 'translate-y-2');
    latestReportTitle.textContent = payload.subjectLabel || '';
    latestReportCreatedAt.textContent = formatReportCreatedAt(payload.createdAt);
    latestReportPeriod.textContent = formatReportPeriod(payload.periodStart, payload.periodEnd);

    if (payload.type && payload.id) {
        latestReportLink.href = `/reports/view/${String(payload.type).toLowerCase()}/${payload.id}?redirectTo=${encodeURIComponent(redirectTo)}`;
    }
};

const initAjaxReportSubmission = function initAjaxReportSubmission(form) {
    if (form.dataset.reportGeneratorMode !== 'ajax') return;

    const submitButton = form.querySelector('[data-report-generator-submit]');
    if (!submitButton) return;

    const defaultButtonLabel = submitButton.textContent.trim();

    form.addEventListener('submit', async (event) => {
        if (event.defaultPrevented) return;

        event.preventDefault();

        const formData = new FormData(form);
        const body = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            body.append(key, String(value));
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Generating...';

        const generatorCard = form.closest('[data-report-generator-card]');
        const latestReportContainer = generatorCard?.querySelector('[data-latest-report-container]');

        if (latestReportContainer) {
            latestReportContainer.classList.add('hidden');
        }

        try {
            const response = await fetch(form.action, {
                method: String(form.method || 'POST').toUpperCase(),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: body.toString(),
            });

            let payload = null;

            try {
                payload = await response.json();
            } catch (error) {
                payload = null;
            }

            if (!response.ok) {
                renderReportGeneratorFlash(form, payload?.flash || {
                    type: 'error',
                    message: payload?.message || 'The report could not be generated.'
                });

                submitButton.disabled = false;
                submitButton.textContent = defaultButtonLabel;
                return;
            }

            updateLatestReportCard(form, payload);

            renderReportGeneratorFlash(form, payload?.flash || {
                type: 'success',
                message: 'Report generated successfully.'
            });

            submitButton.textContent = 'Opening...';

            setTimeout(() => {
                const redirectToField = form.querySelector('[name="redirectTo"]');
                const redirectTo = redirectToField ? redirectToField.value : '/home';

                window.location.href = `/reports/view/${String(payload.type).toLowerCase()}/${payload.id}?redirectTo=${encodeURIComponent(redirectTo)}`;
            }, 600);

        } catch (error) {
            renderReportGeneratorFlash(form, {
                type: 'error',
                message: 'The report could not be generated. Please try again.'
            });

            submitButton.disabled = false;
            submitButton.textContent = defaultButtonLabel;
        }
    });
};

/* Subject search stays unchanged */
const initFullReportSubjectSearch = function initFullReportSubjectSearch(form) {
    const typeField = form.querySelector('.report-type');
    const searchField = form.querySelector('.report-search');
    const subjectField = form.querySelector('.report-subject-id');
    const resultsNode = form.querySelector('.report-search-results');
    const catalogNode = form.parentElement.querySelector('.report-subject-catalog');

    if (!typeField || !searchField || !subjectField || !resultsNode || !catalogNode) {
        return;
    }

    let subjectCatalog = {};

    try {
        subjectCatalog = JSON.parse(catalogNode.textContent || '{}');
    } catch (error) {
        subjectCatalog = {};
    }

    const getCurrentSubjects = function () {
        return (subjectCatalog[typeField.value] || [])
            .map(normalizeSubjectEntry)
            .filter((subject) => subject.id && subject.label);
    };

    const hideResults = function () {
        resultsNode.classList.add('hidden');
        resultsNode.innerHTML = '';
    };

    const selectSubject = function (subject) {
        subjectField.value = subject.id;
        searchField.value = subject.label;
        searchField.setCustomValidity('');
        hideResults();
    };

    const renderResults = function () {
        const searchTerm = searchField.value.trim().toLowerCase();
        const currentSubjects = getCurrentSubjects();
        const filteredSubjects = searchTerm
            ? currentSubjects.filter((s) => s.label.toLowerCase().includes(searchTerm))
            : currentSubjects.slice(0, 5);

        resultsNode.innerHTML = '';

        if (!filteredSubjects.length) {
            const emptyState = document.createElement('p');
            emptyState.className = 'px-3 py-2 text-sm text-brand-text/60';
            emptyState.textContent = 'No matching subjects found.';
            resultsNode.appendChild(emptyState);
            resultsNode.classList.remove('hidden');
            return;
        }

        filteredSubjects.forEach((subject) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'block w-full rounded-lg px-3 py-2 text-left text-sm text-brand-text transition hover:bg-brand-bg';
            button.textContent = subject.label;
            button.addEventListener('click', () => selectSubject(subject));
            resultsNode.appendChild(button);
        });

        resultsNode.classList.remove('hidden');
    };

    const syncSubjectForType = function () {
        const currentSubjects = getCurrentSubjects();

        subjectField.value = '';
        searchField.value = '';
        searchField.placeholder = currentSubjects.length ? 'Search...' : 'No subjects available';
        searchField.readOnly = !currentSubjects.length;

        if (currentSubjects.length === 1) {
            selectSubject(currentSubjects[0]);
            return;
        }

        hideResults();
    };

    searchField.addEventListener('focus', renderResults);
    searchField.addEventListener('input', renderResults);
    typeField.addEventListener('change', syncSubjectForType);

    form.addEventListener('submit', (event) => {
        if (!subjectField.value) {
            event.preventDefault();
            searchField.setCustomValidity('Select a subject before generating a report.');
            searchField.reportValidity();
            return;
        }
        searchField.setCustomValidity('');
    });

    document.addEventListener('click', (event) => {
        if (!resultsNode.contains(event.target) && event.target !== searchField) {
            hideResults();
        }
    });

    syncSubjectForType();
};

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('[data-report-generator="enhanced"]');

    forms.forEach((form) => {
        initFullReportSubjectSearch(form);
        initAjaxReportSubmission(form);
    });
});