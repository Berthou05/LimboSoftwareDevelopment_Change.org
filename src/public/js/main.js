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
        accountMenuToggle.addEventListener('click', () => {
            const isHidden = accountMenuPanel.classList.contains('hidden');

            accountMenuPanel.classList.toggle('hidden', !isHidden);
            accountMenuToggle.setAttribute('aria-expanded', String(isHidden));
        });

        document.addEventListener('click', (event) => {
            if (accountMenu.contains(event.target)) {
                return;
            }

            accountMenuPanel.classList.add('hidden');
            accountMenuToggle.setAttribute('aria-expanded', 'false');
        });
    }
};

const initializePopups = function initializePopups() {
    const openButtons = document.querySelectorAll('[data-popup-open]');
    const closeButtons = document.querySelectorAll('[data-popup-close]');

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

    openButtons.forEach((button) => {
        button.addEventListener('click', () => {
            openPopup(button.getAttribute('data-popup-open'));
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const popup = button.closest('[data-popup]');
            if (!popup) {
                return;
            }

            closePopup(popup);
        });
    });

    document.querySelectorAll('[data-popup]').forEach((popup) => {
        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                closePopup(popup);
            }
        });
    });

    document.querySelectorAll('[data-popup-form]').forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const popup = form.closest('[data-popup]');
            if (!popup) {
                return;
            }

            closePopup(popup);
        });
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

document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeAccountMenu();
    initializePopups();
});
