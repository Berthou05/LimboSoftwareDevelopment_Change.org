function updateLatestReportUI(form, report) {
    const container = form.closest('[data-report-generator-card]');
    if (!container) return;

    const latestSection = container.querySelector('[data-latest-report-container]');
    if (!latestSection) return;

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


document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('[data-report-generator="enhanced"]');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
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

        } catch (err) {
            console.error(err);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Generate Report';
        }
        });
    });
});