const submitTeamMemberForm = async function submitTeamMemberForm(form, errorMessage) {
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

const initializeAddMemberAutocomplete = function initializeAddMemberAutocomplete() {
    const showButton = document.getElementById('showAddMember');
    const panel = document.getElementById('addMemberPanel');

    if (!showButton || !panel) {
        return;
    }

    const form = panel.querySelector('.add-member-form');
    const searchInput = panel.querySelector('.add-member-search');
    const hiddenInput = panel.querySelector('.add-member-id');
    const resultsPanel = panel.querySelector('.add-member-results');
    const catalogNode = panel.querySelector('.add-member-catalog');

    if (!form || !searchInput || !hiddenInput || !resultsPanel || !catalogNode) {
        return;
    }

    let catalog = [];

    try {
        catalog = JSON.parse(catalogNode.textContent || '[]');
    } catch (error) {
        return;
    }

    const normalize = function normalize(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();
    };

    const findExact = function findExact(query) {
        return catalog.find((employee) => normalize(employee.label) === normalize(query));
    };

    const hideResults = function hideResults() {
        resultsPanel.classList.add('hidden');
        resultsPanel.replaceChildren();
    };

    const renderSuggestions = function renderSuggestions(query) {
        const normalizedQuery = normalize(query);
        const matches = catalog
            .filter((employee) => normalize(employee.label).includes(normalizedQuery))
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

        for (const employee of matches) {
            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'block w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-brand-text transition hover:bg-brand-secondary/30';
            button.textContent = employee.label;
            button.addEventListener('mousedown', (event) => event.preventDefault());
            button.addEventListener('click', () => {
                hiddenInput.value = employee.id;
                searchInput.value = employee.label;
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
        if (!panel.contains(event.target) && !showButton.contains(event.target)) {
            hideResults();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        syncHiddenInput();

        if (!hiddenInput.value) {
            searchInput.setCustomValidity('Select a specific employee from the suggestions.');
            searchInput.reportValidity();
            return;
        }

        searchInput.setCustomValidity('');
        await submitTeamMemberForm(form, 'Failed to add member.');
    });
};

const initializeRemoveMemberActions = function initializeRemoveMemberActions() {
    const removeForms = document.querySelectorAll('.remove-member-form');

    for (const form of removeForms) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            await submitTeamMemberForm(form, 'Failed to remove member.');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initializeAddMemberAutocomplete();
    initializeRemoveMemberActions();
});
