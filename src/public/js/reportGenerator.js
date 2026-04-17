//----------------------- Auxiliar Functions -------------------------------

function updateLatestReportUI(form, report) {
    const container = form.closest('[data-report-generator-card]');
    if (!container) return;

    const latestSection = container.querySelector('[data-latest-report-container]');
    if (!latestSection) return;
    latestSection.classList.remove('hidden');

    const createdAtEl = latestSection.querySelector('[data-latest-report-created-at]');
    const periodEl = latestSection.querySelector('[data-latest-report-period]');
    const linkEl = latestSection.querySelector('[data-latest-report-link]');
    const titleEl = latestSection.querySelector('p.font-semibold, p.text-sm');

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
        });

    if (titleEl) {
        titleEl.textContent = report.subjectLabel;
    }

    if (createdAtEl) {
        createdAtEl.textContent = formatDate(report.createdAt);
    }

    if (periodEl) {
        periodEl.textContent =
        `${formatDate(report.periodStart)} - ${formatDate(report.periodEnd)}`;
    }

    if (linkEl) {
        linkEl.href = `/reports/view/${report.type.toLowerCase()}/${report.id}`;
    }
}


function hideLatestReportUI(form) {
    const container = form.closest('[data-report-generator-card]');
    if (!container) return;

    const latestSection = container.querySelector('[data-latest-report-container]');
    if (!latestSection) return;

    latestSection.classList.add('hidden');
}

function showFlash({ type = 'success', message = '' }) {
    const container = document.getElementById('flash-container');
    if (!container) return;

    const colors = {
        success: 'bg-green-100 text-green-700 border-green-300',
        error: 'bg-red-100 text-red-700 border-red-300',
        warning: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    };

    const flash = document.createElement('div');
    flash.className = `
        mb-3 rounded-lg border px-4 py-3 text-sm font-semibold shadow
        ${colors[type] || colors.success}
    `;

    flash.innerHTML = `
        <div class="flex items-center justify-between gap-4">
            <span>${message}</span>
            <button class="text-xs opacity-70 hover:opacity-100">✕</button>
        </div>
    `;

    // Close button
    flash.querySelector('button').addEventListener('click', () => {
        flash.remove();
    });

    container.appendChild(flash);

    // Auto remove
    setTimeout(() => {
        flash.remove();
    }, 4000);
}

//----------------------- Main Functions -------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('[data-report-generator="enhanced"]');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        hideLatestReportUI(form);
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="animate-pulse">Generating...</span>
        `;

        try {
            const formData = new FormData(form);

            const res = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
            });

            const data = await res.json();

            updateLatestReportUI(form, data);

            showFlash({
                type: 'success',
                message: `Report for ${data.subjectLabel} is ready`
            });

        } catch (err) {
            console.error(err);
                showFlash({
                    type: 'error',
                    message: 'Failed to generate report. Try again.'
                });
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Generate Report';
        }
        });
    });
});