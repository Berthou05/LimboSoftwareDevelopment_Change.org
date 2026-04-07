const EMPLOYEE_DIRECTORY_EMPTY_MESSAGE = 'Start typing to see matching employees.';

const initializeEmployeeDirectorySearch = function initializeEmployeeDirectorySearch() {
    const employeeDirectory = document.querySelector('[data-employee-directory]');

    if (!employeeDirectory) {
        return;
    }

    const searchForm = employeeDirectory.querySelector('[data-employee-directory-form]');
    const searchInput = employeeDirectory.querySelector('[data-employee-directory-input]');
    const suggestionsContainer = employeeDirectory.querySelector('[data-employee-directory-suggestions]');
    const statusMessage = employeeDirectory.querySelector('[data-employee-directory-status]');
    const resultsContainer = employeeDirectory.querySelector('[data-employee-directory-results]');
    const searchEndpoint = employeeDirectory.dataset.searchEndpoint || '/employees/search';
    const searchDebounceMs = Number(employeeDirectory.dataset.searchDebounceMs || 250);

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

    const buildStatusMessage = function buildStatusMessage(totalEmployees, query) {
        if (query === '') {
            return `Showing ${totalEmployees} employees.`;
        }

        if (totalEmployees === 1) {
            return `Found 1 employee for "${query}".`;
        }

        return `Found ${totalEmployees} employees for "${query}".`;
    };

    const clearActiveRequest = function clearActiveRequest() {
        if (!activeRequestController) {
            return;
        }

        activeRequestController.abort();
        activeRequestController = null;
    };

    const updateHighlightedSuggestion = function updateHighlightedSuggestion() {
        const suggestionButtons = suggestionsContainer.querySelectorAll('[data-employee-directory-suggestion]');

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
        const emailElement = document.createElement('span');
        const badgeElement = document.createElement('span');
        const suggestionName = suggestion.fullName || suggestion.full_name || 'Unknown employee';
        const suggestionSlack = suggestion.slackUsername || suggestion.slack_username || '';
        const suggestionEmail = suggestion.email || '';

        suggestionButton.type = 'button';
        suggestionButton.dataset.employeeDirectorySuggestion = 'true';
        suggestionButton.dataset.suggestionIndex = String(index);
        suggestionButton.className = (
            'flex w-full items-center justify-between gap-3 px-4 py-3 text-left '
            + 'transition hover:bg-brand-bg focus:bg-brand-bg focus:outline-none'
        );
        suggestionButton.setAttribute('role', 'option');
        suggestionButton.setAttribute('aria-selected', 'false');

        summaryWrapper.className = 'flex min-w-0 flex-col';
        nameElement.className = 'truncate text-sm font-semibold text-brand-text';
        emailElement.className = 'truncate text-xs text-brand-text/70';
        badgeElement.className = (
            'shrink-0 rounded-full bg-brand-primary/10 px-2 py-1 text-xs '
            + 'font-semibold text-brand-primary'
        );

        nameElement.textContent = suggestionName;
        emailElement.textContent = suggestionEmail || suggestionSlack;
        badgeElement.textContent = suggestion.isSelf ? 'My profile' : 'Employee';

        summaryWrapper.appendChild(nameElement);
        summaryWrapper.appendChild(emailElement);
        suggestionButton.appendChild(summaryWrapper);
        suggestionButton.appendChild(badgeElement);

        suggestionButton.addEventListener('click', () => {
            searchInput.value = suggestionName;
            hideSuggestions();
            void fetchEmployeeDirectoryResults();
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

    const fetchEmployeeDirectoryResults = function fetchEmployeeDirectoryResults() {
        const query = searchInput.value.trim();
        const requestUrl = new URL(searchEndpoint, window.location.origin);

        latestRequestId += 1;

        const requestId = latestRequestId;

        requestUrl.searchParams.set('q', query);
        clearActiveRequest();
        activeRequestController = new AbortController();

        setStatusMessage('Searching employees...');

        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            signal: activeRequestController.signal,
        })
            .then((response) => {
                if (response.status === 403) {
                    return response.json().then((payload) => {
                        if (payload.redirectUrl) {
                            window.location.assign(payload.redirectUrl);
                            return null;
                        }

                        throw new Error('You do not have access to employee search.');
                    });
                }

                if (!response.ok) {
                    throw new Error('Unable to search employees right now.');
                }

                return response.json();
            })
            .then((payload) => {
                if (!payload || requestId !== latestRequestId) {
                    return;
                }

                if (payload.redirectUrl) {
                    window.location.assign(payload.redirectUrl);
                    return;
                }

                resultsContainer.innerHTML = payload.resultsHtml;
                resultsContainer.dataset.totalEmployees = String(payload.totalEmployees);
                updateBrowserUrl(payload.query);

                if (payload.query === '') {
                    hideSuggestions();
                    setStatusMessage(buildStatusMessage(payload.totalEmployees, payload.query));
                    return;
                }

                renderSuggestions(payload.suggestions);
                setStatusMessage(buildStatusMessage(payload.totalEmployees, payload.query));
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
            void fetchEmployeeDirectoryResults();
        }, searchDebounceMs);
    };

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        hideSuggestions();
        void fetchEmployeeDirectoryResults();
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            hideSuggestions();
            setStatusMessage(EMPLOYEE_DIRECTORY_EMPTY_MESSAGE);
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
            highlightedSuggestionIndex = highlightedSuggestionIndex <= 0
                ? suggestions.length - 1
                : highlightedSuggestionIndex - 1;
            updateHighlightedSuggestion();
            return;
        }

        if (event.key === 'Enter' && highlightedSuggestionIndex >= 0) {
            event.preventDefault();
            searchInput.value = (
                suggestions[highlightedSuggestionIndex].fullName
                || suggestions[highlightedSuggestionIndex].full_name
                || ''
            );
            hideSuggestions();
            void fetchEmployeeDirectoryResults();
        }
    });

    document.addEventListener('click', (event) => {
        if (employeeDirectory.contains(event.target)) {
            return;
        }

        hideSuggestions();
    });

    setStatusMessage(
        buildStatusMessage(
            Number(resultsContainer.dataset.totalEmployees || 0),
            searchInput.value.trim(),
        ),
    );
};

document.addEventListener('DOMContentLoaded', () => {
    initializeEmployeeDirectorySearch();
});
