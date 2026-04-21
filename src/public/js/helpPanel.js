const initializeHelpPanel = function initializeHelpPanel() {
    const helpPanel = document.querySelector('[data-help-panel]');

    if (!helpPanel) {
        return;
    }

    const titleElement = helpPanel.querySelector('[data-help-title]');
    const summaryElement = helpPanel.querySelector('[data-help-summary]');
    const whenElement = helpPanel.querySelector('[data-help-when]');
    const stepsElement = helpPanel.querySelector('[data-help-steps]');
    const rulesElement = helpPanel.querySelector('[data-help-rules]');
    const relatedElement = helpPanel.querySelector('[data-help-related]');
    const statusElement = helpPanel.querySelector('[data-help-status]');
    const defaultHelpKey = helpPanel.dataset.helpKey || '';
    let activeHelpKey = defaultHelpKey;

    const setStatus = function setStatus(message = '', isError = false) {
        if (!message) {
            statusElement.textContent = '';
            statusElement.classList.add('hidden');
            statusElement.classList.remove('border-red-300', 'bg-red-50', 'text-red-700');
            statusElement.classList.add('border-brand-secondary', 'bg-brand-bg/50', 'text-brand-text/70');
            return;
        }

        statusElement.textContent = message;
        statusElement.classList.remove('hidden');

        if (isError) {
            statusElement.classList.remove('border-brand-secondary', 'bg-brand-bg/50', 'text-brand-text/70');
            statusElement.classList.add('border-red-300', 'bg-red-50', 'text-red-700');
            return;
        }

        statusElement.classList.remove('border-red-300', 'bg-red-50', 'text-red-700');
        statusElement.classList.add('border-brand-secondary', 'bg-brand-bg/50', 'text-brand-text/70');
    };

    const renderList = function renderList(container, items) {
        container.replaceChildren();

        (items || []).forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            container.appendChild(listItem);
        });
    };

    const openPanel = function openPanel() {
        helpPanel.classList.remove('hidden');
        helpPanel.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
        const openButton = document.querySelector(`[data-help-open="${activeHelpKey}"]`);

        if (openButton) {
            openButton.setAttribute('aria-expanded', 'true');
        }
    };

    const closePanel = function closePanel() {
        helpPanel.classList.add('hidden');
        helpPanel.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
        document.querySelectorAll('[data-help-open]').forEach((button) => {
            button.setAttribute('aria-expanded', 'false');
        });
    };

    const renderRelatedEntries = function renderRelatedEntries(relatedEntries) {
        relatedElement.replaceChildren();

        (relatedEntries || []).forEach((entry) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.helpOpen = entry.key;
            button.className = 'rounded-full border border-brand-secondary px-3 py-1.5 text-sm font-semibold text-brand-text/70 transition hover:bg-brand-secondary/20';
            button.textContent = entry.title;
            relatedElement.appendChild(button);
        });
    };

    const renderEntry = function renderEntry(payload) {
        const entry = payload.entry || {};

        titleElement.textContent = entry.title || 'Help';
        summaryElement.textContent = entry.summary || '';
        whenElement.textContent = entry.whenToUse || '';
        renderList(stepsElement, entry.steps || []);
        renderList(rulesElement, entry.rules || []);
        renderRelatedEntries(payload.relatedEntries || []);
        setStatus('');
    };

    const loadHelpEntry = async function loadHelpEntry(helpKey) {
        const normalizedKey = String(helpKey || '').trim();

        if (!normalizedKey) {
            setStatus('This page does not have a help entry yet.', true);
            return;
        }

        activeHelpKey = normalizedKey;
        setStatus('Loading help...');

        try {
            const response = await fetch(`/help/${encodeURIComponent(normalizedKey)}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Help content is not available right now.');
            }

            const payload = await response.json();

            if (!payload.success) {
                throw new Error(payload.message || 'Help content is not available right now.');
            }

            renderEntry(payload);
        } catch (error) {
            setStatus(error.message, true);
        }
    };

    document.addEventListener('click', (event) => {
        const helpOpenButton = event.target.closest('[data-help-open]');

        if (helpOpenButton) {
            event.preventDefault();
            openPanel();
            void loadHelpEntry(helpOpenButton.dataset.helpOpen);
            return;
        }

        if (event.target.closest('[data-help-close]')) {
            event.preventDefault();
            closePanel();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !helpPanel.classList.contains('hidden')) {
            closePanel();
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initializeHelpPanel();
});
