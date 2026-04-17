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
    initializePopups();
    initializePasswordToggles();
});
