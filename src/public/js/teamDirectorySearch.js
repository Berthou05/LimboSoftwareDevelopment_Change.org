const TEAM_DIRECTORY_EMPTY_MESSAGE = 'Start typing to see matching teams.';

const initializeTeamDirectoryArchive = function initializeTeamDirectoryArchive() {
    // Use delegated submit handling so archive buttons keep working after AJAX search rerenders the cards.
    document.addEventListener('submit', async (event) => {
        const form = event.target.closest('[data-team-directory-delete-form]');

        if (!form) {
            return;
        }

        event.preventDefault();

        const confirmed = window.confirm('Archive this team?');

        if (!confirmed) {
            return;
        }

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

        window.alert(payload?.error || 'The team could not be archived right now.');
    });
};

const initializeTeamDirectorySearch = function initializeTeamDirectorySearch() {
    const teamDirectory = document.querySelector('[data-team-directory]');

    if (!teamDirectory) {
        return;
    }

    const searchForm = teamDirectory.querySelector('[data-team-directory-form]');
    const searchInput = teamDirectory.querySelector('[data-team-directory-input]');
    const suggestionsContainer = teamDirectory.querySelector(
        '[data-team-directory-suggestions]',
    );
    const statusMessage = teamDirectory.querySelector('[data-team-directory-status]');
    const resultsContainer = teamDirectory.querySelector('[data-team-directory-results]');
    const searchEndpoint = teamDirectory.dataset.searchEndpoint || '/teams/search';
    const searchDebounceMs = Number(teamDirectory.dataset.searchDebounceMs || 250);

    let activeRequestController = null;
    let debounceTimeoutId = null;
    let highlightedSuggestionIndex = -1;
    let latestRequestId = 0;
    let suggestions = [];

    if (
        !searchForm
        || !searchInput
        || !suggestionsContainer
        || !statusMessage
        || !resultsContainer
    ) {
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

    const buildStatusMessage = function buildStatusMessage(totalTeams, query) {
        if (query === '') {
            return `Showing ${totalTeams} teams.`;
        }

        if (totalTeams === 1) {
            return `Found 1 team for "${query}".`;
        }

        return `Found ${totalTeams} teams for "${query}".`;
    };

    const clearActiveRequest = function clearActiveRequest() {
        if (!activeRequestController) {
            return;
        }

        activeRequestController.abort();
        activeRequestController = null;
    };

    const updateHighlightedSuggestion = function updateHighlightedSuggestion() {
        const suggestionButtons = suggestionsContainer.querySelectorAll(
            '[data-team-directory-suggestion]',
        );

        for (const [index, suggestionButton] of suggestionButtons.entries()) {
            const isHighlighted = index === highlightedSuggestionIndex;

            suggestionButton.classList.toggle('bg-brand-bg', isHighlighted);
            suggestionButton.setAttribute('aria-selected', String(isHighlighted));

            if (isHighlighted) {
                suggestionButton.scrollIntoView({
                    block: 'nearest',
                });
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
        suggestionButton.dataset.teamDirectorySuggestion = 'true';
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
        badgeElement.textContent = suggestion.isMember ? 'My team' : 'Team';

        summaryWrapper.appendChild(nameElement);
        summaryWrapper.appendChild(leadElement);
        suggestionButton.appendChild(summaryWrapper);
        suggestionButton.appendChild(badgeElement);

        suggestionButton.addEventListener('click', () => {
            searchInput.value = suggestion.name;
            hideSuggestions();
            void fetchTeamDirectoryResults();
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

    const fetchTeamDirectoryResults = function fetchTeamDirectoryResults() {
        const query = searchInput.value.trim();
        const requestUrl = new URL(searchEndpoint, window.location.origin);

        latestRequestId += 1;

        const requestId = latestRequestId;

        requestUrl.searchParams.set('q', query);
        clearActiveRequest();
        activeRequestController = new AbortController();

        setStatusMessage('Searching teams...');

        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            signal: activeRequestController.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to search teams right now.');
                }

                return response.json();
            })
            .then((payload) => {
                if (requestId !== latestRequestId) {
                    return;
                }

                resultsContainer.innerHTML = payload.resultsHtml;
                resultsContainer.dataset.totalTeams = String(payload.totalTeams);
                updateBrowserUrl(payload.query);

                if (payload.query === '') {
                    hideSuggestions();
                    setStatusMessage(buildStatusMessage(payload.totalTeams, payload.query));
                    return;
                }

                renderSuggestions(payload.suggestions);
                setStatusMessage(buildStatusMessage(payload.totalTeams, payload.query));
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
            void fetchTeamDirectoryResults();
        }, searchDebounceMs);
    };

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        hideSuggestions();
        void fetchTeamDirectoryResults();
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            hideSuggestions();
            setStatusMessage(TEAM_DIRECTORY_EMPTY_MESSAGE);
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
            highlightedSuggestionIndex = (
                highlightedSuggestionIndex + 1
            ) % suggestions.length;
            updateHighlightedSuggestion();
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            highlightedSuggestionIndex = highlightedSuggestionIndex <= 0
                ? suggestions.length - 1
                : highlightedSuggestionIndex - 1;
            updateHighlightedSuggestion();
            return;
        }

        if (event.key === 'Enter' && highlightedSuggestionIndex >= 0) {
            event.preventDefault();
            searchInput.value = suggestions[highlightedSuggestionIndex].name;
            hideSuggestions();
            void fetchTeamDirectoryResults();
        }
    });

    document.addEventListener('click', (event) => {
        if (teamDirectory.contains(event.target)) {
            return;
        }

        hideSuggestions();
    });

    setStatusMessage(
        buildStatusMessage(
            Number(resultsContainer.dataset.totalTeams || 0),
            searchInput.value.trim(),
        ),
    );
};

document.addEventListener('DOMContentLoaded', () => {
    initializeTeamDirectorySearch();
    initializeTeamDirectoryArchive();
});
