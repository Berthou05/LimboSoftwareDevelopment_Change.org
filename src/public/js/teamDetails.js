const submitInlineForm = async function submitInlineForm(form, errorMessage) {
    const formData = new FormData(form);
    const body = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
        body.append(key, String(value));
    }

    const response = await fetch(form.action, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    if (response.ok) {
        window.location.reload();
        return;
    }

    let payload = null;

    try {
        payload = await response.json();
    } catch (error) {
        payload = null;
    }

    window.alert(payload?.error || errorMessage);
};

const normalizePickerValue = function normalizePickerValue(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();
};

const initializeInlinePickers = function initializeInlinePickers() {
    const sections = document.querySelectorAll('.js-inline-picker');

    for (const section of sections) {
        const showButton = section.querySelector('.js-picker-toggle');
        const panel = section.querySelector('.js-picker-panel');
        const form = section.querySelector('.js-picker-form');
        const searchInput = section.querySelector('.js-picker-search');
        const hiddenInput = section.querySelector('.js-picker-id');
        const resultsPanel = section.querySelector('.js-picker-results');
        const catalogNode = section.querySelector('.js-picker-catalog');

        if (!showButton || !panel || !form || !searchInput || !hiddenInput || !resultsPanel || !catalogNode) {
            continue;
        }

        let catalog = [];

        try {
            catalog = JSON.parse(catalogNode.textContent || '[]');
        } catch (error) {
            continue;
        }

        const formErrorMessage = form.dataset.errorMessage || 'Failed to submit.';
        const validationMessage = searchInput.dataset.validationMessage || 'Select a specific option from the suggestions.';

        const findExact = function findExact(query) {
            return catalog.find((item) => normalizePickerValue(item.label) === normalizePickerValue(query));
        };

        const hideResults = function hideResults() {
            resultsPanel.classList.add('hidden');
            resultsPanel.replaceChildren();
        };

        const renderSuggestions = function renderSuggestions(query) {
            const normalizedQuery = normalizePickerValue(query);
            const matches = catalog
                .filter((item) => normalizePickerValue(item.label).includes(normalizedQuery))
                .slice(0, 8);

            resultsPanel.replaceChildren();

            if (matches.length === 0) {
                const emptyState = document.createElement('p');

                emptyState.className = 'px-2 py-2 text-sm text-brand-text/60';
                emptyState.textContent = 'No matches found.';
                resultsPanel.appendChild(emptyState);
                resultsPanel.classList.remove('hidden');
                return;
            }

            for (const item of matches) {
                const button = document.createElement('button');

                button.type = 'button';
                button.className = 'block w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-brand-text transition hover:bg-brand-secondary/30';
                button.textContent = item.label;
                button.addEventListener('mousedown', (event) => event.preventDefault());
                button.addEventListener('click', () => {
                    hiddenInput.value = item.id;
                    searchInput.value = item.label;
                    searchInput.setCustomValidity('');
                    hideResults();
                });
                resultsPanel.appendChild(button);
            }

            resultsPanel.classList.remove('hidden');
        };

        const syncHiddenInput = function syncHiddenInput() {
            const exactMatch = findExact(searchInput.value);

            hiddenInput.value = exactMatch ? exactMatch.id : '';
        };

        showButton.addEventListener('click', () => {
            panel.classList.toggle('hidden');

            if (!panel.classList.contains('hidden')) {
                searchInput.focus();
            } else {
                hideResults();
            }
        });

        searchInput.addEventListener('input', () => {
            syncHiddenInput();
            searchInput.setCustomValidity('');
            renderSuggestions(searchInput.value);
        });

        searchInput.addEventListener('focus', () => {
            renderSuggestions(searchInput.value);
        });

        document.addEventListener('click', (event) => {
            if (!section.contains(event.target)) {
                hideResults();
            }
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            syncHiddenInput();

            if (!hiddenInput.value) {
                searchInput.setCustomValidity(validationMessage);
                searchInput.reportValidity();
                return;
            }

            searchInput.setCustomValidity('');
            await submitInlineForm(form, formErrorMessage);
        });
    }
};

const initializeInlineSubmitForms = function initializeInlineSubmitForms() {
    const forms = document.querySelectorAll('.js-inline-submit');

    for (const form of forms) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            await submitInlineForm(form, form.dataset.errorMessage || 'Failed to submit.');
        });
    }
};

const initializeDeleteTeamForms = function initializeDeleteTeamForms() {
    const forms = document.querySelectorAll('[data-team-delete-form]');

    for (const form of forms) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            await submitDeleteTeamForm(form);
        });
    }
};

const submitDeleteTeamForm = async function submitDeleteTeamForm(form) {
    const response = await fetch(form.action, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(form)).toString(),
    });

    const payload = await response.json().catch(() => null);

    if (response.ok) {
        window.location.href = payload?.redirectTo || '/team';
        return;
    }

    window.alert(payload?.error || form.dataset.errorMessage || 'The team could not be deleted right now.');
};

const initializeDeleteProjectForms = function initializeDeleteProjectForms() {
    const forms = document.querySelectorAll('[data-project-delete-form]');

    for (const form of forms) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            await submitDeleteProjectForm(form);
        });
    }
};

const submitDeleteProjectForm = async function submitDeleteProjectForm(form) {
    const response = await fetch(form.action, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(form)).toString(),
    });

    const payload = await response.json().catch(() => null);

    if (response.ok) {
        window.location.href = payload?.redirectTo || '/projects';
        return;
    }

    window.alert(payload?.error || form.dataset.errorMessage || 'The project could not be deleted right now.');
};

document.addEventListener('DOMContentLoaded', () => {
    initializeInlinePickers();
    initializeInlineSubmitForms();
    initializeDeleteTeamForms();
    initializeDeleteProjectForms();
});
