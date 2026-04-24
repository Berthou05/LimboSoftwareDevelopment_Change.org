const initializeSidebar = function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');

    if (sidebar && sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (sidebar.hasAttribute('data-collapsed')) {
                sidebar.removeAttribute('data-collapsed');
                return;
            }

            sidebar.setAttribute('data-collapsed', 'true');
        });
    }

    if (sidebar && mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            if (sidebar.hasAttribute('data-mobile-open')) {
                sidebar.removeAttribute('data-mobile-open');
                return;
            }

            sidebar.setAttribute('data-mobile-open', 'true');
        });

        document.addEventListener('click', (event) => {
            if (!sidebar.hasAttribute('data-mobile-open')) {
                return;
            }

            const clickedInsideSidebar = sidebar.contains(event.target);
            const clickedToggle = mobileMenuToggle.contains(event.target);

            if (!clickedInsideSidebar && !clickedToggle) {
                sidebar.removeAttribute('data-mobile-open');
            }
        });
    }
};

const initializeAccountMenu = function initializeAccountMenu() {
    const accountMenu = document.querySelector('[data-account-menu]');
    const accountMenuToggle = document.querySelector('[data-account-menu-toggle]');
    const accountMenuPanel = document.querySelector('[data-account-menu-panel]');

    if (accountMenu && accountMenuToggle && accountMenuPanel) {
        const openAccountMenu = function openAccountMenu() {
            accountMenuPanel.classList.remove('hidden');
            accountMenuToggle.setAttribute('aria-expanded', 'true');
        };

        const closeAccountMenu = function closeAccountMenu() {
            accountMenuPanel.classList.add('hidden');
            accountMenuToggle.setAttribute('aria-expanded', 'false');
        };

        accountMenuToggle.addEventListener('click', () => {
            const isHidden = accountMenuPanel.classList.contains('hidden');

            if (isHidden) {
                openAccountMenu();
                return;
            }

            closeAccountMenu();
        });

        document.addEventListener('click', (event) => {
            if (accountMenu.contains(event.target)) {
                return;
            }

            closeAccountMenu();
        });
    }
};

const initializeBackButtons = function initializeBackButtons() {
    document.querySelectorAll('[data-back-button]').forEach((backButton) => {
        backButton.addEventListener('click', () => {
            const fallbackUrl = backButton.getAttribute('data-fallback-url') || '/home';
            const referrer = document.referrer || '';
            const hasInternalReferrer = referrer.startsWith(window.location.origin);

            if (window.history.length > 1 && hasInternalReferrer) {
                window.history.back();
                return;
            }

            window.location.href = fallbackUrl;
        });
    });
};

const GLOBAL_SEARCH_EMPTY_MESSAGE = 'Start typing to search employees, teams, and projects.';

const initializeGlobalSearch = function initializeGlobalSearch() {
    const searchForm = document.querySelector('[data-global-search]');

    if (!searchForm) {
        return;
    }

    const searchInput = searchForm.querySelector('[data-global-search-input]');
    const suggestionsContainer = searchForm.querySelector('[data-global-search-suggestions]');
    const statusMessage = searchForm.querySelector('[data-global-search-status]');
    const searchEndpoint = searchForm.dataset.searchEndpoint || '/search';
    const searchDebounceMs = Number(searchForm.dataset.searchDebounceMs || 250);

    let activeRequestController = null;
    let debounceTimeoutId = null;
    let highlightedSuggestionIndex = -1;
    let latestRequestId = 0;
    let suggestions = [];

    if (!searchInput || !suggestionsContainer || !statusMessage) {
        return;
    }

    const hideSuggestions = function hideSuggestions() {
        suggestionsContainer.replaceChildren();
        suggestionsContainer.classList.add('hidden');
        searchInput.setAttribute('aria-expanded', 'false');
        highlightedSuggestionIndex = -1;
        suggestions = [];
    };

    const setStatusMessage = function setStatusMessage(message) {
        statusMessage.textContent = message;
    };

    const clearActiveRequest = function clearActiveRequest() {
        if (!activeRequestController) {
            return;
        }

        activeRequestController.abort();
        activeRequestController = null;
    };

    const navigateToSuggestion = function navigateToSuggestion(suggestion) {
        if (!suggestion?.url) {
            return;
        }

        window.location.assign(suggestion.url);
    };

    const updateHighlightedSuggestion = function updateHighlightedSuggestion() {
        const suggestionButtons = suggestionsContainer.querySelectorAll('[data-global-search-suggestion]');

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
        const titleElement = document.createElement('span');
        const subtitleElement = document.createElement('span');
        const badgeElement = document.createElement('span');

        suggestionButton.type = 'button';
        suggestionButton.dataset.globalSearchSuggestion = 'true';
        suggestionButton.dataset.suggestionIndex = String(index);
        suggestionButton.className = (
            'flex w-full items-center justify-between gap-3 px-4 py-3 text-left '
            + 'transition hover:bg-brand-bg focus:bg-brand-bg focus:outline-none'
        );
        suggestionButton.setAttribute('role', 'option');
        suggestionButton.setAttribute('aria-selected', 'false');

        summaryWrapper.className = 'flex min-w-0 flex-col';
        titleElement.className = 'truncate text-sm font-semibold text-brand-text';
        subtitleElement.className = 'truncate text-xs text-brand-text/70';
        badgeElement.className = (
            'shrink-0 rounded-full bg-brand-primary/10 px-2 py-1 text-xs '
            + 'font-semibold text-brand-primary'
        );

        titleElement.textContent = suggestion.title || 'Unknown result';
        subtitleElement.textContent = suggestion.subtitle || 'Open result';
        badgeElement.textContent = suggestion.badge || 'Result';

        summaryWrapper.appendChild(titleElement);
        summaryWrapper.appendChild(subtitleElement);
        suggestionButton.appendChild(summaryWrapper);
        suggestionButton.appendChild(badgeElement);

        suggestionButton.addEventListener('click', () => {
            navigateToSuggestion(suggestion);
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

    const fetchSuggestions = function fetchSuggestions() {
        const query = searchInput.value.trim();
        const requestUrl = new URL(searchEndpoint, window.location.origin);

        latestRequestId += 1;

        const requestId = latestRequestId;

        if (query === '') {
            clearActiveRequest();
            hideSuggestions();
            setStatusMessage(GLOBAL_SEARCH_EMPTY_MESSAGE);
            return Promise.resolve();
        }

        requestUrl.searchParams.set('q', query);
        clearActiveRequest();
        activeRequestController = new AbortController();

        setStatusMessage(`Searching "${query}"...`);

        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            signal: activeRequestController.signal,
        })
            .then(async (response) => {
                let payload = {};

                try {
                    payload = await response.json();
                } catch (error) {
                    payload = {};
                }

                if (!response.ok) {
                    throw new Error(payload.error || 'Unable to search right now.');
                }

                return payload;
            })
            .then((payload) => {
                if (requestId !== latestRequestId) {
                    return;
                }

                renderSuggestions(payload.suggestions || []);

                if ((payload.suggestions || []).length === 0) {
                    setStatusMessage(`No quick matches for "${payload.query}". Press Enter to view all results.`);
                    return;
                }

                setStatusMessage(`Showing ${(payload.suggestions || []).length} quick matches for "${payload.query}".`);
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    return;
                }

                hideSuggestions();
                setStatusMessage(error.message || 'Unable to search right now.');
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
            void fetchSuggestions();
        }, searchDebounceMs);
    };

    searchForm.addEventListener('submit', () => {
        hideSuggestions();
        clearActiveRequest();
        window.clearTimeout(debounceTimeoutId);
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();

        if (query === '') {
            window.clearTimeout(debounceTimeoutId);
            latestRequestId += 1;
            clearActiveRequest();
            hideSuggestions();
            setStatusMessage(GLOBAL_SEARCH_EMPTY_MESSAGE);
            return;
        }

        scheduleSearch();
    });

    searchInput.addEventListener('focus', () => {
        if (suggestions.length > 0) {
            suggestionsContainer.classList.remove('hidden');
            searchInput.setAttribute('aria-expanded', 'true');
            return;
        }

        if (searchInput.value.trim() !== '') {
            scheduleSearch();
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
            navigateToSuggestion(suggestions[highlightedSuggestionIndex]);
        }
    });

    document.addEventListener('click', (event) => {
        if (searchForm.contains(event.target)) {
            return;
        }

        hideSuggestions();
    });

    setStatusMessage(searchInput.value.trim() === '' ? GLOBAL_SEARCH_EMPTY_MESSAGE : '');
};

const initializePopups = function initializePopups() {
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

    /*submitPopupForm(form)
    Sends popup forms through AJAX and lets the UI refresh once the backend confirms the change.*/

    const submitPopupForm = async function submitPopupForm(form) {
        const formData = new FormData(form);
        const body = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            body.append(key, String(value));
        }

        const response = await fetch(form.action, {
            method: String(form.method || 'POST').toUpperCase(),
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

        window.alert(payload?.error || form.dataset.errorMessage || 'Failed to submit form.');
    };

    document.addEventListener('click', (event) => {
        const openButton = event.target.closest('[data-popup-open]');
        if (openButton) {
            openPopup(openButton.getAttribute('data-popup-open'));
            return;
        }

        const closeButton = event.target.closest('[data-popup-close]');
        if (closeButton) {
            const popup = closeButton.closest('[data-popup]');
            if (!popup) {
                return;
            }

            closePopup(popup);
            return;
        }

        const popup = event.target.closest('[data-popup]');
        if (popup && event.target === popup) {
            closePopup(popup);
        }
    });

    document.addEventListener('submit', async (event) => {
        const form = event.target.closest('[data-popup-form]');
        if (!form) {
            return;
        }

        event.preventDefault();
        const popup = form.closest('[data-popup]');
        const formAction = (form.getAttribute('action') || '').trim();

        if (!formAction) {
            if (!popup) {
                return;
            }

            closePopup(popup);
            return;
        }

        await submitPopupForm(form);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') {
            return;
        }

        document.querySelectorAll('[data-popup]:not(.hidden)').forEach((popup) => {
            closePopup(popup);
        });
    });
};

const initializePasswordToggles = function initializePasswordToggles() {
    const pairs = [
        { toggleId: 'toggleLoginPassword', inputId: 'loginPassword' },
    ];

    pairs.forEach(({ toggleId, inputId }) => {
        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);

        if (!toggle || !input) {
            return;
        }

        toggle.addEventListener('click', () => {
            const show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeAccountMenu();
    initializeBackButtons();
    initializeGlobalSearch();
    initializePopups();
    initializePasswordToggles();
});
