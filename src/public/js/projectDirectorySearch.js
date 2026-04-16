const PROJECT_DIRECTORY_EMPTY_MESSAGE = 'Start typing to see matching projects.';

const initializeProjectDirectoryArchive = function initializeProjectDirectoryArchive() {
    const openPopup = function openPopup(popupId) {
        const popup = document.querySelector(`[data-popup="${popupId}"]`);

        if (!popup) {
            return;
        }

        popup.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    };

    const closePopup = function closePopup(popup) {
        popup.classList.add('hidden');

        if (!document.querySelector('[data-popup]:not(.hidden)')) {
            document.body.classList.remove('overflow-hidden');
        }
    };

    // Keep popup confirmation and delete submission active even when live search replaces the cards.
    document.addEventListener('click', (event) => {
        const openButton = event.target.closest('[data-popup-open]');
        const closeButton = event.target.closest('[data-popup-close]');
        const popup = event.target.closest('[data-popup]');

        if (openButton) {
            openPopup(openButton.getAttribute('data-popup-open'));
            return;
        }

        if (closeButton) {
            const parentPopup = closeButton.closest('[data-popup]');

            if (!parentPopup) {
                return;
            }

            closePopup(parentPopup);
            return;
        }

        if (popup && event.target === popup) {
            closePopup(popup);
        }
    });

    document.addEventListener('submit', async (event) => {
        const form = event.target.closest('[data-project-directory-delete-form]');

        if (!form) {
            return;
        }

        event.preventDefault();

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

        window.alert(payload?.error || 'The project could not be archived right now.');
    });
};

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
    initializeProjectDirectoryArchive();
});
