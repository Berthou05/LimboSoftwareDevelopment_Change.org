function buildReportText() {
    let output = '';

    document.querySelectorAll('#report-content section').forEach(section => {
        const title = section.querySelector('h2')?.textContent.trim() || '';
        const content = section.querySelector('[data-content]')?.textContent.trim() || '';

        if (title) {
            output += `=== ${title} ===\n`;
        }
        if (content) {
            output += content + '\n\n';
        }
    });

    return output.trim();
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

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-toggle-section]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('section');
            const content = section.querySelector('[data-content]');
            const icon = button.querySelector('[data-icon]');

            if (!content) return;
            const isHidden = content.classList.contains('hidden');
            content.classList.toggle('hidden');
            button.classList.toggle('border-b', isHidden);

            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });

        // Open first section
    if (buttons.length > 0) {
        const firstContent = buttons[0]
            .closest('section')
            .querySelector('[data-content]');
        
        if (firstContent){
            firstContent.classList.remove('hidden');
            buttons[0].classList.add('border-b');
            buttons[0].querySelector('[data-icon]').classList.toggle('rotate-180');
        }
    }
});