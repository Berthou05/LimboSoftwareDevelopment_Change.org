function buildReportText() {
    let output = '';

    document.querySelectorAll('#report-content section').forEach(section => {
        output += section.innerText + '\n\n';
    });

    return output;
}

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.querySelector('.js-copy-report');

    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        const report = document.getElementById('report-content');

        if (!report) return;

        const text = buildReportText();

        try {
        await navigator.clipboard.writeText(text);

        // Optional feedback
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
            copyBtn.innerText = 'Copy report';
        }, 2000);

        } catch (err) {
        console.error('Copy failed', err);
        }
    });
});