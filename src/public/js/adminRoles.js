/*showFlash({ type, message })
FUnction responsible for managing the flash alerts in the Role Administration page*/

function showFlash({ type, message }) {
    const container = document.getElementById('flash-container');

    let classes = '';

    if (type === 'success') {
        classes = 'border-emerald-300 bg-emerald-50 text-emerald-800';
    } else if (type === 'warning') {
        classes = 'border-amber-300 bg-amber-50 text-amber-800';
    } else {
        classes = 'border-red-300 bg-red-50 text-red-800';
    }

    container.innerHTML = `
        <div id="flash-msg"
        class="mb-5 rounded-xl border px-4 py-3 text-sm ${classes} transition-opacity duration-300 opacity-100">
        ${message}
        </div>
    `;

    setTimeout(() => {
        const msg = document.getElementById('flash-msg');
        if (!msg) return;

        msg.classList.add('opacity-0');

        setTimeout(() => {
        msg.remove();
        }, 800);
    }, 4000);
}

//----------------------   MAIN FUNCTIONS   ----------------------------

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
                button.classList.add('bg-brand-nav', 'text-white');
                button.classList.remove('bg-brand-secondary/50', 'text-brand-text/70');
            } else {
                button.textContent = 'OFF';
                button.classList.remove('bg-brand-nav', 'text-white');
                button.classList.add('bg-brand-secondary/50', 'text-brand-text/70');
            }

        } catch (err) {
            console.error(err);
        }
    });
});

document.querySelectorAll('[data-action="delete-roles"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
        const form = e.target;

        if (!form.matches('[data-action="delete-roles"]')) return;
        e.preventDefault();
        e.stopImmediatePropagation();

        const url = form.action;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: new FormData(form)
            });

            const data = await response.json();

            showFlash(data);

            if (data.type === 'success') {
                form.closest('[data-popup]')
                ?.querySelector('[data-popup-close]')
                ?.click();
                setTimeout(() => location.reload(), 1000);
            }

            form.closest('[data-popup]')
                ?.querySelector('[data-popup-close]')
                ?.click();

        } catch (err) {
            console.error(err);
            showFlash({
                type: 'error',
                message: 'Network error'
            });
        }
    });
});

document.querySelectorAll('[data-action="add-role"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
        const form = e.target;

        if (!form.matches('[data-action="add-role"]')) return;
        e.preventDefault();
        e.stopImmediatePropagation();

        const url = form.action;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: new FormData(form)
            });

            const data = await response.json();

            showFlash(data);

            if (data.type === 'success') {
                form.closest('[data-popup]')
                ?.querySelector('[data-popup-close]')
                ?.click();
                setTimeout(() => location.reload(), 1000);
            }

            form.closest('[data-popup]')
                ?.querySelector('[data-popup-close]')
                ?.click();

        } catch (err) {
            console.error(err);
            showFlash({
                type: 'error',
                message: 'Network error'
            });
        }
    });
});