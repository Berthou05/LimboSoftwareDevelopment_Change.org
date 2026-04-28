const initializeBlockerFilters = function initializeBlockerFilters() {
    let tooltip = document.querySelector('[data-blocker-tooltip]');

    const ensureTooltip = function ensureTooltip() {
        if (tooltip) {
            return tooltip;
        }

        tooltip = document.createElement('div');
        tooltip.setAttribute('data-blocker-tooltip', 'true');
        tooltip.className = 'pointer-events-none fixed z-[70] hidden max-w-[220px] rounded-lg bg-white px-2 py-1 text-[10px] leading-tight text-brand-text shadow-panel';
        document.body.appendChild(tooltip);

        return tooltip;
    };

    const showTooltip = function showTooltip(content, backgroundColor) {
        const tooltipElement = ensureTooltip();

        tooltipElement.textContent = content;
        tooltipElement.style.backgroundColor = backgroundColor || '#eff6ff';
        tooltipElement.classList.remove('hidden');
    };

    const moveTooltip = function moveTooltip(event) {
        if (!tooltip || tooltip.classList.contains('hidden')) {
            return;
        }

        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY + 10}px`;
    };

    const hideTooltip = function hideTooltip() {
        if (!tooltip) {
            return;
        }

        tooltip.classList.add('hidden');
    };

    const fetchBlockerPartial = async function fetchBlockerPartial(targetUrl, blockerContainer) {
        const requestUrl = new URL(targetUrl, window.location.origin);
        const previousTop = blockerContainer.getBoundingClientRect().top;

        requestUrl.searchParams.set('ajax', 'blocker');

        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Unable to load blockers right now.');
        }

        const payload = await response.json();
        const nextContainer = document.createElement('div');

        nextContainer.innerHTML = payload.html.trim();

        const replacement = nextContainer.firstElementChild;

        if (!replacement) {
            throw new Error('Unable to load blockers right now.');
        }

        blockerContainer.replaceWith(replacement);
        const nextTop = replacement.getBoundingClientRect().top;

        window.scrollBy(0, nextTop - previousTop);
        window.history.replaceState({}, '', payload.url || requestUrl.pathname);
    };

    document.addEventListener('click', (event) => {
        const blockerLink = event.target.closest('[data-blocker-ajax-link]');

        if (!blockerLink) {
            return;
        }

        const blockerContainer = blockerLink.closest('[data-blocker-ajax]');

        if (!blockerContainer) {
            return;
        }

        event.preventDefault();

        fetchBlockerPartial(blockerLink.href, blockerContainer)
            .catch(() => {
                window.location.href = blockerLink.href;
            });
    });

    document.addEventListener('mouseover', (event) => {
        const blockerColumn = event.target.closest('[data-blocker-tooltip-content]');

        if (!blockerColumn) {
            return;
        }

        showTooltip(
            blockerColumn.getAttribute('data-blocker-tooltip-content') || '',
            blockerColumn.getAttribute('data-blocker-tooltip-color') || '#eff6ff',
        );
        moveTooltip(event);
    });

    document.addEventListener('mousemove', (event) => {
        if (!event.target.closest('[data-blocker-tooltip-content]')) {
            return;
        }

        moveTooltip(event);
    });

    document.addEventListener('mouseout', (event) => {
        const blockerColumn = event.target.closest('[data-blocker-tooltip-content]');

        if (!blockerColumn) {
            return;
        }

        const nextTarget = event.relatedTarget;

        if (nextTarget && blockerColumn.contains(nextTarget)) {
            return;
        }

        hideTooltip();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initializeBlockerFilters();
});
