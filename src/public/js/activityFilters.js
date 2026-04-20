const initializeActivityFilters = function initializeActivityFilters() {
    const fetchActivityPartial = async function fetchActivityPartial(targetUrl, activityContainer) {
        const requestUrl = new URL(targetUrl, window.location.origin);

        requestUrl.searchParams.set('ajax', 'activity');

        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Unable to load activity right now.');
        }

        const payload = await response.json();
        const nextContainer = document.createElement('div');

        nextContainer.innerHTML = payload.html.trim();

        if (!nextContainer.firstElementChild) {
            throw new Error('Unable to load activity right now.');
        }

        activityContainer.replaceWith(nextContainer.firstElementChild);
        window.history.replaceState({}, '', payload.url || requestUrl.pathname);
    };

    const submitActivityForm = function submitActivityForm(form, activityContainer) {
        const requestUrl = new URL(form.action || window.location.pathname, window.location.origin);
        const formData = new FormData(form);

        for (const [key, value] of formData.entries()) {
            requestUrl.searchParams.set(key, String(value));
        }

        return fetchActivityPartial(requestUrl, activityContainer);
    };

    /*The activity cards keep normal links/forms as a fallback, so failed AJAX requests
    should return to the original navigation flow instead of leaving stale UI state.*/
    document.addEventListener('click', (event) => {
        const activityLink = event.target.closest('[data-activity-ajax-link]');

        if (!activityLink) {
            return;
        }

        const activityContainer = activityLink.closest('[data-activity-ajax]');

        if (!activityContainer) {
            return;
        }

        event.preventDefault();

        fetchActivityPartial(activityLink.href, activityContainer)
            .catch(() => {
                window.location.href = activityLink.href;
            });
    });

    document.addEventListener('change', (event) => {
        const form = event.target.closest('[data-activity-ajax-form]');

        if (!form) {
            return;
        }

        const activityContainer = form.closest('[data-activity-ajax]');

        if (!activityContainer) {
            return;
        }

        submitActivityForm(form, activityContainer)
            .catch(() => {
                form.submit();
            });
    });

    document.addEventListener('submit', (event) => {
        const form = event.target.closest('[data-activity-ajax-form]');

        if (!form) {
            return;
        }

        const activityContainer = form.closest('[data-activity-ajax]');

        if (!activityContainer) {
            return;
        }

        event.preventDefault();

        submitActivityForm(form, activityContainer)
            .catch(() => {
                form.submit();
            });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initializeActivityFilters();
});
