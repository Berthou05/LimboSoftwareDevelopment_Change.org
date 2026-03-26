<<<<<<< HEAD
const PROJECT_DIRECTORY_EMPTY_MESSAGE = 'Start typing to see matching projects.';

const initializeProjectDirectorySearch = function initializeProjectDirectorySearch() {
    const projectDirectory = document.querySelector('[data-project-directory]');

    if (!projectDirectory) {
        return;
    }

    const searchForm = projectDirectory.querySelector('[data-project-directory-form]');
    const searchInput = projectDirectory.querySelector('[data-project-directory-input]');
    const suggestionsContainer = projectDirectory.querySelector('[data-project-directory-suggestions]');
    const statusMessage = projectDirectory.querySelector('[data-project-directory-status]');
    const resultsContainer = projectDirectory.querySelector('[data-project-directory-results]');
    const searchEndpoint = projectDirectory.dataset.searchEndpoint || '/projects/search';
    const searchDebounceMs = Number(projectDirectory.dataset.searchDebounceMs || 250);

    let activeRequestController = null;
    let debounceTimeoutId = null;
    let highlightedSuggestionIndex = -1;
    let latestRequestId = 0;
    let suggestions = [];

    if (!searchForm || !searchInput || !suggestionsContainer || !statusMessage || !resultsContainer) {
        return;
    }

    const hideSuggestions = function hideSuggestions() {
        suggestionsContainer.replaceChildren();
        suggestionsContainer.classList.add('hidden');
        searchInput.setAttribute('aria-expanded', 'false');
        highlightedSuggestionIndex = -1;
        suggestions = [];
    };

    const setStatusMessage = function setStatusMessage(message, isError = false) {
        if (message === '') {
            statusMessage.textContent = '';
            statusMessage.classList.add('hidden');
            statusMessage.classList.remove('text-red-600');
            statusMessage.classList.add('text-brand-text/60');
            return;
        }
        statusMessage.textContent = message;
        statusMessage.classList.remove('hidden');
        if (isError) {
            statusMessage.classList.remove('text-brand-text/60');
            statusMessage.classList.add('text-red-600');
            return;
        }
        statusMessage.classList.remove('text-red-600');
        statusMessage.classList.add('text-brand-text/60');
    };

    const buildStatusMessage = function buildStatusMessage(totalProjects, query) {
        if (query === '') {
            return `Showing ${totalProjects} projects.`;
        }
        if (totalProjects === 1) {
            return `Found 1 project for "${query}".`;
        }
        return `Found ${totalProjects} projects for "${query}".`;
    };

    const clearActiveRequest = function clearActiveRequest() {
        if (!activeRequestController) {
            return;
        }
        activeRequestController.abort();
        activeRequestController = null;
    };

    const updateHighlightedSuggestion = function updateHighlightedSuggestion() {
        const suggestionButtons = suggestionsContainer.querySelectorAll('[data-project-directory-suggestion]');
        for (const [index, suggestionButton] of suggestionButtons.entries()) {
            const isHighlighted = index === highlightedSuggestionIndex;
            suggestionButton.classList.toggle('bg-brand-bg', isHighlighted);
            suggestionButton.setAttribute('aria-selected', String(isHighlighted));
            if (isHighlighted) {
                suggestionButton.scrollIntoView({ block: 'nearest' });
            }
        }
    };

    const createSuggestionButton = function createSuggestionButton(suggestion, index) {
        const suggestionButton = document.createElement('button');
        const summaryWrapper = document.createElement('span');
        const nameElement = document.createElement('span');
        const leadElement = document.createElement('span');
        const badgeElement = document.createElement('span');

        suggestionButton.type = 'button';
        suggestionButton.dataset.projectDirectorySuggestion = 'true';
        suggestionButton.dataset.suggestionIndex = String(index);
        suggestionButton.className = (
            'flex w-full items-center justify-between gap-3 px-4 py-3 text-left '
            + 'transition hover:bg-brand-bg focus:bg-brand-bg focus:outline-none'
        );
        suggestionButton.setAttribute('role', 'option');
        suggestionButton.setAttribute('aria-selected', 'false');

        summaryWrapper.className = 'flex min-w-0 flex-col';
        nameElement.className = 'truncate text-sm font-semibold text-brand-text';
        leadElement.className = 'truncate text-xs text-brand-text/70';
        badgeElement.className = (
            'shrink-0 rounded-full bg-brand-primary/10 px-2 py-1 text-xs '
            + 'font-semibold text-brand-primary'
        );

        nameElement.textContent = suggestion.name;
        leadElement.textContent = `Lead: ${suggestion.leadName}`;
        badgeElement.textContent = suggestion.isMember ? 'My project' : 'Project';

        summaryWrapper.appendChild(nameElement);
        summaryWrapper.appendChild(leadElement);
        suggestionButton.appendChild(summaryWrapper);
        suggestionButton.appendChild(badgeElement);

        suggestionButton.addEventListener('click', () => {
            searchInput.value = suggestion.name;
            hideSuggestions();
            void fetchProjectDirectoryResults();
        });

        return suggestionButton;
    };

    const renderSuggestions = function renderSuggestions(nextSuggestions) {
        suggestionsContainer.replaceChildren();
        highlightedSuggestionIndex = -1;
        suggestions = nextSuggestions;
        if (nextSuggestions.length === 0) {
            hideSuggestions();
            return;
        }
        const suggestionsFragment = document.createDocumentFragment();
        for (const [index, suggestion] of nextSuggestions.entries()) {
            const suggestionButton = createSuggestionButton(suggestion, index);
            suggestionsFragment.appendChild(suggestionButton);
        }
        suggestionsContainer.appendChild(suggestionsFragment);
        suggestionsContainer.classList.remove('hidden');
        searchInput.setAttribute('aria-expanded', 'true');
    };

    const updateBrowserUrl = function updateBrowserUrl(query) {
        const currentUrl = new URL(window.location.href);
        if (query === '') {
            currentUrl.searchParams.delete('q');
        } else {
            currentUrl.searchParams.set('q', query);
        }
        window.history.replaceState({}, '', currentUrl);
    };

    const fetchProjectDirectoryResults = function fetchProjectDirectoryResults() {
        const query = searchInput.value.trim();
        const requestUrl = new URL(searchEndpoint, window.location.origin);
        latestRequestId += 1;
        const requestId = latestRequestId;
        requestUrl.searchParams.set('q', query);
        clearActiveRequest();
        activeRequestController = new AbortController();
        setStatusMessage('Searching projects...');
        return fetch(requestUrl, {
            method: 'GET',
            headers: { Accept: 'application/json' },
            signal: activeRequestController.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to search projects right now.');
                }
                return response.json();
            })
            .then((payload) => {
                if (requestId !== latestRequestId) {
                    return;
                }
                resultsContainer.innerHTML = payload.resultsHtml;
                resultsContainer.dataset.totalProjects = String(payload.totalProjects);
                updateBrowserUrl(payload.query);
                if (payload.query === '') {
                    hideSuggestions();
                    setStatusMessage(buildStatusMessage(payload.totalProjects, payload.query));
                    return;
                }
                renderSuggestions(payload.suggestions);
                setStatusMessage(buildStatusMessage(payload.totalProjects, payload.query));
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    return;
                }
                setStatusMessage(error.message, true);
            })
            .finally(() => {
                if (requestId !== latestRequestId) {
                    return;
                }
                activeRequestController = null;
            });
    };

    const scheduleSearch = function scheduleSearch() {
        window.clearTimeout(debounceTimeoutId);
        debounceTimeoutId = window.setTimeout(() => {
            void fetchProjectDirectoryResults();
        }, searchDebounceMs);
    };

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        hideSuggestions();
        void fetchProjectDirectoryResults();
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            hideSuggestions();
            setStatusMessage(PROJECT_DIRECTORY_EMPTY_MESSAGE);
        }
        scheduleSearch();
    });

    searchInput.addEventListener('focus', () => {
        if (suggestions.length > 0) {
            suggestionsContainer.classList.remove('hidden');
            searchInput.setAttribute('aria-expanded', 'true');
        }
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideSuggestions();
            return;
        }
        if (suggestions.length === 0) {
            return;
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            highlightedSuggestionIndex = (highlightedSuggestionIndex + 1) % suggestions.length;
            updateHighlightedSuggestion();
            return;
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            highlightedSuggestionIndex = highlightedSuggestionIndex <= 0 ? suggestions.length - 1 : highlightedSuggestionIndex - 1;
            updateHighlightedSuggestion();
            return;
        }
        if (event.key === 'Enter' && highlightedSuggestionIndex >= 0) {
            event.preventDefault();
            searchInput.value = suggestions[highlightedSuggestionIndex].name;
            hideSuggestions();
            void fetchProjectDirectoryResults();
        }
    });

    document.addEventListener('click', (event) => {
        if (projectDirectory.contains(event.target)) {
            return;
        }
        hideSuggestions();
    });

    setStatusMessage(
        buildStatusMessage(
            Number(resultsContainer.dataset.totalProjects || 0),
            searchInput.value.trim(),
        ),
    );
};

document.addEventListener('DOMContentLoaded', () => {
    initializeProjectDirectorySearch();
});
=======
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
>>>>>>> 3a2272b9b7144f6dcf7316cd1170df2d3ca830e8
