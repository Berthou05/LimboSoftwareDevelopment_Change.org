/*Script for Admin Accounts page*/

/*Functionality focused on checking for the select with class .role-select
in order to update in case it is modified and receives an AJAX response.*/

document.querySelectorAll('.role-select').forEach((select) => {
let previousValue = select.value;

select.addEventListener('change', async function () {
    const accountId = this.dataset.accountId;
    const csrfToken = this.dataset.csrf;
    const roleId    = this.value;
    const feedback  = this.nextElementSibling;

    // Visual: dim the select while the request is in flight
    this.disabled = true;
    feedback.className = 'role-feedback mt-1 text-xs font-semibold text-brand-text/60';
    feedback.textContent = 'Updating…';

    try {
    const res  = await fetch(`/admin/accounts/${accountId}/role`, {
        method:  'POST',
        headers: {
        'Content-Type': 'application/json',
        'CSRF-Token':   csrfToken,
        },
        body: JSON.stringify({ roleId }),
    });

    const json = await res.json();

    if (res.ok) {
        // 200 — success
        previousValue = roleId;
        showFeedback(feedback, `✓ Role set to ${json.data.role_name}`, 'text-green-600');
    } else if (res.status === 409) {
        // 409 — would remove the last admin
        this.value = previousValue;
        showFeedback(feedback, `✗ ${json.error}`, 'text-amber-600');
    } else {
        // 500 — server error
        this.value = previousValue;
        showFeedback(feedback, `✗ ${json.error}`, 'text-red-500');
    }
    } catch (err) {
    // Network / unexpected failure
    this.value = previousValue;
    showFeedback(feedback, '✗ Connection error. Try again.', 'text-red-500');
    } finally {
    this.disabled = false;
    }
});
});



/*Functionality focused on checking for the select with class .status-select
in order to update in case it is modified and receives an AJAX response.*/

document.querySelectorAll('.status-select').forEach((select) => {
    let previousValue = select.value;

    select.addEventListener('change', async function () {
        const accountId = this.dataset.accountId;
        const csrfToken = this.dataset.csrf;
        const status    = this.value;
        const feedback  = this.nextElementSibling;

        this.disabled = true;
        feedback.className = 'status-feedback mt-1 text-xs font-semibold text-brand-text/60';
        feedback.textContent = 'Updating…';

        try {
        const res = await fetch(`/admin/accounts/${accountId}/status`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
            },
            body: JSON.stringify({ status }),
        });

        const json = await res.json();

        if (res.ok) {
            previousValue = status;
            showFeedback(feedback, `✓ Status updated to ${status}`, 'text-green-600');
        } else {
            this.value = previousValue;
            showFeedback(feedback, `✗ ${json.error}`, 'text-red-500');
        }

        } catch (err) {
        this.value = previousValue;
        showFeedback(feedback, '✗ Connection error. Try again.', 'text-red-500');
        } finally {
        this.disabled = false;
        }
    });
});


/*showFeedback(el, message, colorClass)
Function responsible for showing a small feedback based on the update of Roles
or Status*/

function showFeedback(el, message, colorClass) {
el.className = `role-feedback mt-1 text-xs font-semibold ${colorClass}`;
el.textContent = message;
// Auto-hide after 3 seconds
setTimeout(() => {
    el.className = 'role-feedback mt-1 hidden text-xs font-semibold';
    el.textContent = '';
}, 3000);
}
