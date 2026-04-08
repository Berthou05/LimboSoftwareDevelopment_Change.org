document.querySelectorAll('.toggle-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const button = form.querySelector('.toggle-btn');
        const url = form.action;

        try {
            const formData = new FormData(form);

            const response = await fetch(url, {
                method: 'POST',
                body:formData
            });

            const data = await response.json();

            if (data.enabled) {
                button.textContent = 'ON';
                button.classList.add('bg-brand-primary', 'text-white');
                button.classList.remove('bg-brand-secondary/50', 'text-brand-text/70');
            } else {
                button.textContent = 'OFF';
                button.classList.remove('bg-brand-primary', 'text-white');
                button.classList.add('bg-brand-secondary/50', 'text-brand-text/70');
            }

        } catch (err) {
            console.error(err);
        }
    });
});