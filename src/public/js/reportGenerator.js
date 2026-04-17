const normalizeSubjectEntry = function normalizeSubjectEntry(subject) {
    const subjectId = subject.id || subject.employee_id || subject.team_id || subject.project_id || '';
    const subjectLabel = subject.label || subject.name || subject.full_name || '';

    return {
        id: String(subjectId || '').trim(),
        label: String(subjectLabel || '').trim(),
    };
};

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

    const getCurrentSubjects = function getCurrentSubjects() {
        return (subjectCatalog[typeField.value] || [])
            .map(normalizeSubjectEntry)
            .filter((subject) => subject.id && subject.label);
    };

    const hideResults = function hideResults() {
        resultsNode.classList.add('hidden');
        resultsNode.innerHTML = '';
    };

    const selectSubject = function selectSubject(subject) {
        subjectField.value = subject.id;
        searchField.value = subject.label;
        searchField.setCustomValidity('');
        hideResults();
    };

    const renderResults = function renderResults() {
        const searchTerm = searchField.value.trim().toLowerCase();
        const currentSubjects = getCurrentSubjects();
        const filteredSubjects = searchTerm
            ? currentSubjects.filter((subject) => subject.label.toLowerCase().includes(searchTerm))
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
            button.addEventListener('click', () => {
                selectSubject(subject);
            });
            resultsNode.appendChild(button);
        });

        resultsNode.classList.remove('hidden');
    };

    const syncSubjectForType = function syncSubjectForType() {
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

    searchField.addEventListener('focus', () => {
        if (searchField.readOnly) {
            return;
        }

        renderResults();
    });

    searchField.addEventListener('input', () => {
        subjectField.value = '';
        searchField.setCustomValidity('');
        renderResults();
    });

    typeField.addEventListener('change', () => {
        syncSubjectForType();
    });

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
    });
});
