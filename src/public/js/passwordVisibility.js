document.querySelectorAll('[data-password-toggle]').forEach((toggleButton) => {
    const input = document.getElementById(toggleButton.dataset.passwordToggle);
    const eyeIcon = toggleButton.querySelector('[data-password-eye]');
    const eyeOffIcon = toggleButton.querySelector('[data-password-eye-off]');

    if (!input) {
        return;
    }

    toggleButton.addEventListener('click', () => {
        const shouldShowPassword = input.type === 'password';

        input.type = shouldShowPassword ? 'text' : 'password';
        eyeIcon && eyeIcon.classList.toggle('hidden', shouldShowPassword);
        eyeOffIcon && eyeOffIcon.classList.toggle('hidden', !shouldShowPassword);
        toggleButton.setAttribute(
            'aria-label',
            shouldShowPassword ? 'Hide password' : 'Show password',
        );
    });
});
