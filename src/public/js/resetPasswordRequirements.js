const passwordInput = document.getElementById('resetPassword');
const requirementItems = document.querySelectorAll('[data-password-requirement]');

const checks = {
    length: (password) => password.length >= 8,
    uppercase: (password) => /[A-Z]/.test(password),
    number: (password) => /[0-9]/.test(password),
    special: (password) => /[^A-Za-z0-9]/.test(password),
};

const updateRequirement = function updateRequirement(item, isMet) {
    const status = item.querySelector('[data-requirement-status]');

    item.classList.toggle('text-green-600', isMet);
    item.classList.toggle('text-brand-text/70', !isMet);

    if (status) {
        status.textContent = isMet ? '\u2713' : '\u00d7';
    }
};

const updateRequirements = function updateRequirements() {
    const password = passwordInput ? passwordInput.value : '';

    requirementItems.forEach((item) => {
        const requirement = item.dataset.passwordRequirement;
        const check = checks[requirement];

        if (!check) {
            return;
        }

        updateRequirement(item, check(password));
    });
};

if (passwordInput && requirementItems.length) {
    passwordInput.addEventListener('input', updateRequirements);
    updateRequirements();
}
